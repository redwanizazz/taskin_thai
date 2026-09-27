import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './OrgChart.module.css';
import { orgChartDepartments, orgChartData } from '../../data/team';

const OrgChart = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const treeRef = useRef(null);
  const overlayRef = useRef(null);
  const scaleWrapRef = useRef(null);
  const observerRef = useRef(null);

  // Refs for each level
  const directorRefs = useRef([]);
  const seniorMgrRef = useRef(null);
  const branchHeadRefs = useRef([]);
  const branchMemberRefs = useRef([]);

  // Setup refs arrays appropriately
  useEffect(() => {
    directorRefs.current = directorRefs.current.slice(0, orgChartData.directors?.length || 0);
    branchHeadRefs.current = branchHeadRefs.current.slice(0, orgChartData.branches?.length || 0);
    branchMemberRefs.current = (orgChartData.branches || []).map((b, i) => {
      const current = branchMemberRefs.current[i] || [];
      return current.slice(0, b.members?.length || 0);
    });
  }, [orgChartData]);

  const fitToContainer = useCallback(() => {
    const tree = treeRef.current;
    const scaleWrap = scaleWrapRef.current;
    if (!tree || !scaleWrap) return 1;
    
    if (window.innerWidth <= 640) {
      tree.style.transform = 'none';
      scaleWrap.style.height = 'auto';
      return 1;
    }
    
    tree.style.transform = 'none';
    const availW = scaleWrap.clientWidth;
    const naturalW = tree.scrollWidth;
    const naturalH = tree.scrollHeight;
    let scale = 1;
    if (naturalW > availW - 4) {
      scale = (availW - 4) / naturalW;
      scale = Math.min(1, Math.max(0.4, scale));
    }
    tree.style.transform = scale < 1 ? `scale(${scale})` : 'none';
    scaleWrap.style.height = `${naturalH * scale}px`;
    return scale;
  }, []);

  const drawLines = useCallback(() => {
    const tree = treeRef.current;
    const overlay = overlayRef.current;
    if (!tree || !overlay) return;
    
    overlay.innerHTML = '';
    const scale = fitToContainer();
    
    if (window.innerWidth <= 640) {
      // Don't draw lines on mobile
      return;
    }

    const treeRect = tree.getBoundingClientRect();
    
    function centerOf(el) {
      const r = el.getBoundingClientRect();
      return {
        x: (r.left + r.width / 2 - treeRect.left) / scale,
        top: (r.top - treeRect.top) / scale,
        bottom: (r.bottom - treeRect.top) / scale,
      };
    }
    
    function groupPoint(els) {
      const pts = els.map(centerOf);
      return {
        x: pts.reduce((s, p) => s + p.x, 0) / pts.length,
        bottom: Math.max(...pts.map(p => p.bottom)),
      };
    }
    
    function vline(x, y1, y2) {
      const d = document.createElement('div');
      d.className = styles.ln;
      d.style.cssText = `position:absolute;background:rgba(63,75,39,0.35);left:${x-1}px;top:${Math.min(y1,y2)}px;width:2px;height:${Math.abs(y2-y1)}px;`;
      overlay.appendChild(d);
    }
    
    function hline(x1, x2, y) {
      const d = document.createElement('div');
      d.className = styles.ln;
      d.style.cssText = `position:absolute;background:rgba(63,75,39,0.35);left:${Math.min(x1,x2)}px;top:${y-1}px;width:${Math.abs(x2-x1)}px;height:2px;`;
      overlay.appendChild(d);
    }
    
    function connect(parentPoint, childEls) {
      if (!parentPoint || !childEls.length) return;
      const children = childEls.map(centerOf);
      const minTop = Math.min(...children.map(c => c.top));
      const midY = parentPoint.bottom + (minTop - parentPoint.bottom) / 2;
      vline(parentPoint.x, parentPoint.bottom, midY);
      if (children.length > 1) {
        const xs = children.map(c => c.x);
        hline(Math.min(...xs), Math.max(...xs), midY);
      }
      children.forEach(c => vline(c.x, midY, c.top));
    }
    
    // 1. Directors -> Senior Manager
    const dirEls = directorRefs.current.filter(Boolean);
    const smEl = seniorMgrRef.current;
    if (dirEls.length && smEl) connect(groupPoint(dirEls), [smEl]);
    
    // 2. Senior Manager -> Branch heads
    const bhEls = branchHeadRefs.current.filter(Boolean);
    if (smEl && bhEls.length) connect(centerOf(smEl), bhEls);
    
    // 3. Each branch head -> its members
    bhEls.forEach((head, i) => {
      const members = (branchMemberRefs.current[i] || []).filter(Boolean);
      if (head && members.length) connect(centerOf(head), members);
    });
  }, [fitToContainer]);

  const handleResize = useCallback(() => {
    let timeoutId;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      drawLines();
    }, 120);
  }, [drawLines]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    document.fonts.ready.then(drawLines);
    
    // Intersection observer for animation
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const cards = treeRef.current?.querySelectorAll(`.${styles.card}`);
        if (cards) {
          cards.forEach((card, i) => {
            setTimeout(() => {
              card.classList.add(styles.pulse);
              setTimeout(() => card.classList.remove(styles.pulse), 1000);
            }, i * 50);
          });
        }
        setTimeout(drawLines, 750); // Redraw after reveal
      }
    }, { threshold: 0.1 });

    if (scaleWrapRef.current) {
      observerRef.current.observe(scaleWrapRef.current);
    }
    
    drawLines();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      if (observerRef.current && scaleWrapRef.current) {
        observerRef.current.unobserve(scaleWrapRef.current);
      }
    };
  }, [drawLines, handleResize]);

  useEffect(() => {
    drawLines();
  }, [activeFilter, drawLines]);

  const isDimmed = (dept) => {
    if (activeFilter === 'all' || activeFilter === 'All') return false;
    return dept !== activeFilter;
  };

  const renderCard = (member, isSmall = false, isDirector = false, ref = null) => {
    if (!member) return null;
    const dimClass = isDimmed(member.dept) ? styles.dim : '';
    const sizeClass = isSmall ? styles.smallCard : '';
    const typeClass = isDirector ? styles.directorCard : '';

    return (
      <div 
        ref={ref} 
        className={`${styles.card} ${dimClass} ${sizeClass} ${typeClass}`}
      >
        <div className={styles.photoWrap}>
          <img src={member.photo} alt={`${member.name}, ${member.role}`} className={styles.photo} />
        </div>
        <div className={styles.info}>
          <h4 className={styles.name}>{member.name}</h4>
          <p className={styles.role}>{member.role}</p>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.orgChartSection}>
      <div className={styles.sectionHead}>
        <span className={styles.eyebrow}>Company Organization Chart</span>
        <h3 className={styles.title}>Meet Everyone, By Role</h3>
        <p className={styles.desc}>Our dedicated team members structure to ensure quality and excellent service.</p>
      </div>

      <div className={styles.filters}>
        {orgChartDepartments.map(dept => (
          <button 
            key={dept.id} 
            className={`${styles.filterBtn} ${activeFilter === dept.id ? styles.activeFilter : ''}`}
            onClick={() => setActiveFilter(dept.id)}
          >
            {dept.label}
          </button>
        ))}
      </div>

      <div className={styles.chartArea}>
        <div className={styles.scaleWrap} ref={scaleWrapRef}>
          <div className={styles.tree} ref={treeRef}>
            <div className={styles.overlay} ref={overlayRef}></div>
            
            {/* Directors Row */}
            {orgChartData.directors && orgChartData.directors.length > 0 && (
              <div className={styles.level}>
                <div className={styles.levelTop}>
                  {orgChartData.directors.map((dir, i) => (
                    renderCard(dir, false, true, el => directorRefs.current[i] = el)
                  ))}
                </div>
              </div>
            )}

            {/* Senior Manager Row */}
            {orgChartData.seniorManager && (
              <div className={styles.level}>
                <div className={styles.levelTop}>
                  {renderCard(orgChartData.seniorManager, false, false, seniorMgrRef)}
                </div>
              </div>
            )}

            {/* Branches Row */}
            {orgChartData.branches && orgChartData.branches.length > 0 && (
              <div className={`${styles.level} ${styles.branchesLevel}`}>
                {orgChartData.branches.map((branch, i) => (
                  <div key={i} className={styles.branch}>
                    <div className={styles.head}>
                      {renderCard(branch.head, false, false, el => branchHeadRefs.current[i] = el)}
                    </div>
                    {branch.members && branch.members.length > 0 && (
                      <div className={styles.sub}>
                        {branch.members.map((member, j) => {
                          if (!branchMemberRefs.current[i]) branchMemberRefs.current[i] = [];
                          return renderCard(member, true, false, el => branchMemberRefs.current[i][j] = el)
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className={styles.hintText}>
        <span>Hover cards for details • Switch tabs to filter by department</span>
      </div>
    </div>
  );
};

export default OrgChart;
