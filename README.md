# Inspire Girls Academy

This project uses NextJS to allow the maintainer to create and edit a website using React JS and
Next JS to create a static website that can be hosted on any static hosting service.

To publish new content to the IGA website you will need to edit the contents of this
repository and push the changes to the `master` branch. The website will automatically
be built and deployed to the production website.

## How do I edit the website?

If the content to be changed is text, then you can edit the files in the `pages` directory. If,
however, the content to be changed is an image, then you will need to replace the image in the
`public` directory. If the change is to a score, the schedule or the league table then
the appropriate file in the `data` directory will need to be changed.

## How is the site published?

The website uses GitHub Actions to build and deploy the website to the production website. When a commit
is pushed to the `master` branch, GitHub Actions will build the website by running `npm run build` and
then deploy the website to the production website by logging onto it using FTP and copying the files.
