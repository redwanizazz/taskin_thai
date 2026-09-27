export const teamPhotos = [
  { src: '/images/team-group-1.jpg', alt: 'Team photo 1', caption: 'Our team at the warehouse' },
  { src: '/images/team-group-2.jpg', alt: 'Team photo 2', caption: 'Our team at the retail store' },
  { src: '/images/team-group-3.jpg', alt: 'Team photo 3', caption: 'Our team on the shop floor' },
  { src: '/images/team-group-4.jpg', alt: 'Team photo 4', caption: 'Our full Taskin Thai team' },
];

export const orgChartDepartments = [
  { id: 'all', label: 'All Departments' },
  { id: 'mgmt', label: 'Management' },
  { id: 'fleet', label: 'Fleet & Transport' },
  { id: 'admin', label: 'Admin' },
  { id: 'retail', label: 'Retail' },
  { id: 'accounts', label: 'Accounts' },
];

export const orgChartData = {
  directors: [
    { name: 'Juwita Binti Aziz', role: 'Director', dept: 'mgmt', photo: '/images/orgchart-juwita-aziz.jpg' },
    { name: 'Md Ershad Biswas', role: 'Director', dept: 'mgmt', photo: '/images/orgchart-ershad-biswas.jpg' },
  ],
  seniorManager: {
    name: 'Samsul Bakhtiar', role: 'Senior Manager', dept: 'mgmt', photo: '/images/orgchart-samsul-bakhtiar.jpg',
  },
  branches: [
    {
      head: { name: 'Nurfarah Wahida', role: 'HR Executive', dept: 'admin', photo: '/images/orgchart-nurfarah-wahida.jpg' },
      members: [],
    },
    {
      head: { name: 'Accounts Executive', role: 'Finance & Accounts', dept: 'accounts', photo: '/images/orgchart-accounts-exec.jpg' },
      members: [],
    },
    {
      head: { name: 'Mohamad Syahman', role: 'Fleet & Transport Exec.', dept: 'fleet', photo: '/images/orgchart-mohamad-syahman.jpg' },
      members: [
        { name: 'Muhamamad Rahmat', role: 'Lorry Driver', dept: 'fleet', photo: '/images/orgchart-muhammad-rahmat.jpg' },
        { name: 'Mohd Syazrul Azzani', role: 'Lorry Driver', dept: 'fleet', photo: '/images/orgchart-syazrul-azzani.jpg' },
        { name: 'Muhd Shahrul Nizam', role: 'Lorry Driver', dept: 'fleet', photo: '/images/orgchart-shahrul-nizam.jpg' },
        { name: 'Samin Shasudin', role: 'Lorry Driver', dept: 'fleet', photo: '/images/orgchart-samin-shasudin.jpg' },
        { name: 'Muhd Hairul Maharis', role: 'Lorry Driver', dept: 'fleet', photo: '/images/orgchart-hairul-maharis.jpg' },
        { name: 'Mohd Soffian', role: 'Lorry Driver', dept: 'fleet', photo: '/images/orgchart-soffian.jpg' },
        { name: 'Mohd Khairulnizam', role: 'Lorry Driver', dept: 'fleet', photo: '/images/orgchart-khairulnizam.jpg' },
      ],
    },
    {
      head: { name: 'Nur Zaidah', role: 'Admin Executive', dept: 'admin', photo: '/images/orgchart-nur-zaidah.jpg' },
      members: [
        { name: 'Theerthii Thanapal', role: 'Admin Assistant', dept: 'admin', photo: '/images/orgchart-theerthii-thanapal.jpg' },
      ],
    },
    {
      head: { name: 'Shahirah Abdul Wahab', role: 'Retail Supervisor', dept: 'retail', photo: '/images/orgchart-shahirah-abdul-wahab.jpg' },
      members: [
        { name: 'Abdul Halim', role: 'Cashier', dept: 'retail', photo: '/images/orgchart-abdul-halim.jpg' },
        { name: 'Muhd Amir Rasyidi', role: 'Cashier', dept: 'retail', photo: '/images/orgchart-amir-rasyidi.jpg' },
        { name: 'Abd Aziz', role: 'Cashier', dept: 'retail', photo: '/images/orgchart-abd-aziz.jpg' },
        { name: 'Anas Hafifi', role: 'Cashier', dept: 'retail', photo: '/images/orgchart-anas-hafifi.jpg' },
        { name: 'Ika Shahira', role: 'Cashier', dept: 'retail', photo: '/images/orgchart-ika-shahira.jpg' },
      ],
    },
  ],
};
