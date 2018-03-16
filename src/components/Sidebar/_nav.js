export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info'
      }
    },
    {
      title: true,
      name: 'Menu',
      wrapper: {
        element: 'span',
        attributes: {}
      },
      class: ''
    },
    {
      name: 'Create Report',
      url: '/create-report',
      icon: 'icon-doc'
    },
    {
      name: 'Upload Report',
      url: '/upload-report',
      icon: 'icon-cloud-upload'
    },
    {
      name: 'Edit Report',
      url: '/edit-report',
      icon: 'icon-cloud-upload'
    },
    {
      name: 'Reference Data',
      url: '/reference-data',
      icon: 'icon-book-open',
      children: [
        {
          name: 'Agency profile',
          url: '/reference-data/agency-profile',
          icon: 'icon-home'
        },
        {
          name: 'Institutions',
          url: '/institutions',
          icon: 'icon-graduation'
        },
        {
          name: 'Countries',
          url: '/reference-data/countries',
          icon: 'icon-globe-alt'
        }
      ]
    },
      {
        name: 'Alerts and flags',
        url: '/alerts-and-flags',
        icon: 'icon-flag'
    },
      {
        name: 'Statistics',
        url: '/statistics',
        icon: 'icon-chart'
    }
  ]
};
