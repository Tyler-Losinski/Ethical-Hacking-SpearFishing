export default {
  items: [
    //{
    //  name: 'Dashboard',
    //  url: '/dashboard',
    //  icon: 'icon-speedometer'
    //},
    {
      title: true,
      name: 'Attack',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Contact Info',
      url: '/AddContacts',
      icon: 'icon-cloud-download',
    },
    {
      name: 'Fished Info',
      url: '/EditContacts',
      icon: 'icon-pencil',
    }
  ],
};
