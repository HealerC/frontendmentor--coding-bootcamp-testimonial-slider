This is a solution to the [Coding bootcamp testimonials slider challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/coding-bootcamp-testimonials-slider-4FNyLA8JL). It was a "junior" challenge on frontend mentor but expanded upon by adding few extra functionality.

The solution is hosted at netlify:- [https://codingbootcamptestimonials.netlify.app](https://codingbootcamptestimonials.netlify.app)

One can view each testimonial and navigate it using their mouse/trackpad, as well as with keyboard keys **ArrowLeft, p (previous); ArrowRight, n (next)**. New testimonials can be added, existing testimonials can be edited and deleted. Cloudinary provides the widget for uploading images and the local storage persists the data.

## Goofs

- I used the dart's `sass --watch` to compile the scss to css on each save instead of `npm install`ing the sass library and using it directly in `App.js`
- I think I was suppose to include `App.css.map` in `.gitignore`
