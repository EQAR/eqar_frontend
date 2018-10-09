# DEQAR Admin UI - StyleGuide
The following is a suggested styling guide for the DEQAR Admin UI application to use common patterns for the React/JSX components.

## Programming Styles
AirBNB has a pretty comprehensive list of the recommended styling rules, I think we can safely stick to that, available here:
https://github.com/airbnb/javascript/blob/master/react/README.md

## Directory Structure 
In my previous React projects I was using the following directory structure, which worked pretty well.  
    
    .
    ├── ...
    ├── src                    
    │   ├── assets
    │       ├── css
    │       ├── fonts
    │       ├── img
    │   ├── config
    |     	└── config.js
    │   ├── components
    |     	├── ComponentName
    │           ├── actions
    |               ├── componentAction.js
    │               └── ...
    │           ├── reducers
    |               ├── componentReducer.js
    │               └── ...
    |       ├── ComponentName.css
    |       └── ComponentName.js
    │   ├── routes
    |       └── navigation.js
    │   ├── store
    |       ├── actionTypes.js 
    |       ├── reducer.js
    |       └── store.js
    │   ├── utils
    |       └── utilityName.js 
    |   ├── variables 
    |       └── variables.js
    |   ├── views
    |       ├── viewName
    |           ├── viewName.css
    |           └── viewName.js
    |   ├── index.css 
    |   └── index.js
    └── ...

The role of the main directories:

`assets` - Static assets (css or images) which will be imported into components.

`components` - Components which will be reused many times in the application, or coming from a 3rd party library. (Typically special tables, form fields, etc.)

`routes` - Usually the router (and the navigation) can be generated from a configuration object. I'm putting this here, to know if I have to modify a menu, I can do it here.

`store` - Redux related stuff is going here. I'm following reacts recommendation and creating constants for action names in the `actionTypes.js` file. (reference: https://redux.js.org/recipes/reducingboilerplate)

`utils` - reusable logic come here in its separate file. For example if I have to check that a form contains error, I'd put the function `checkFormSubmitState` in the file `checkFormSubmitState.js` here: 

```
export const checkSubmitState = (formState) => {
  if(formState.errors) {
    return true;
  }
};
```
`variables` - If the system needs some global constants, that can be inserted here. 
`views` - Components which are strictly belonging to one particular view (page) are coming here. 

## Patterns / libraries
For forms I prefer to use:
https://joepuzzo.github.io/informed/
It offers super easy field validation options, and easy integration of custom components. 

Notes about Redux:
I don't like to put everything to redux, only the state of those elements which need to be active even when the user navigates away from the page and keeping the state gives a nicer UX. 

mapDispatchToProps:
Even if there is redux-thunk for side-effects in action code, I like to use mapDispatchToProps, since it makes the components more structured and readable. 
(https://codepen.io/stowball/post/a-dummy-s-guide-to-redux-and-thunk-in-react)

Testing:
I have no preference at this moment :)
