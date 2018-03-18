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
      icon: 'icon-doc',
    },
    {
      name: '//Upload Report',
      // url: '/upload-report',
      url: '#',
      icon: 'icon-cloud-upload',
    },
    {
      name: '//Edit Report',
      // url: '/edit-report',
      url: '#',
      icon: 'icon-cloud-upload',
      active: 'disabled'
    },
    {
      name: 'Reference Data',
      url: '/reference-data',
      icon: 'icon-book-open',
      children: [
        {
          name: '//Agency profile',
          // url: '/reference-data/agency-profile',
          url: '#',
          icon: 'icon-home'
        },
        {
          name: 'Institutions',
          url: '/institutions',
          icon: 'icon-graduation'
        },
        {
          name: '//Countries',
          // url: '/reference-data/countries',
          url: '#',
          icon: 'icon-globe-alt'
        }
      ]
    },
      {
        name: '//Alerts and flags',
        // url: '/alerts-and-flags',
        url: '#',
        icon: 'icon-flag'
    },
      {
        name: '//Statistics',
        // url: '/statistics',
        url: '#',
        icon: 'icon-chart'
    }
  ]
};
