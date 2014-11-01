tinyDOM
=======

tinyDOM is a fairly simple jquery alternative that works in a similar way, making it easy to find and modify DOM elements.
It's accessed through the symbol 'μ' or the alias 'mu' where unicode isn't available (both can be used any time).

Basic Usage
-----------
There are two different categories of tinyDOM functions - utility functions and DOM manipulation functions. The former are 
invoked directly on the mu object and generally work on their paramaters, such as the 'merge' function for merging two JSON 
objects:

```javascript
μ.merge(objectA, objectB); // objectA will contain all of the properties of both objectA and objectB
```

and the 'exists' function for simplifying existence checks:

```javascript
μ.exists(objectC);  // Returns false if objectC is null or if typeof(objectC) returns 'undefined'
```

DOM manipulation
----------------
The second category of tinyDOM functions operate on DOM elements via a mu object, which is created by passing a query selector
to mu. The returned mu object provides methods that make it easier to interact with the DOM elements and also allows you to
call a function on a set of DOM elements via the '.each(fn)' interface. Here's a simple example of attaching an event handler
to all elements with the 'clickable' class:

```javascript
μ('.clickable').on('click', function(){
  console.log(this);
});
```

It doesn't make sense to perform certain operations on a group, and in those cases the first matched element will be used 
as the target of a given function - this might be important in cases where multiple elements will match a query selector.
For example, the '.data(key)' function wouldn't work if it attempted to get data from every element in a set.
