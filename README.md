# chineseCharacterHelpr
Chinese Character Helpr -- An augmented input method for Chinese character writing and learning

=======
# Members
## Justin Olmanson
### Professor - University of Nebraska - Lincoln
contact: jolmanson2@unl.edu
-- Justin Bio goes here

## Xianquan Liu
### Student - University of Nebraska - Lincoln
contact: crystal040524@gmail.com
-- Crystal bio goes here

## Shawn Hellwege
### Web Developer
contact: shellwe@gmail.com
Shawn was involved in this web application as his final project masters program at the University of Nebraska - Lincoln. Shawn is a professional web developer in the commercial sector in Lincoln Nebraska.

# Setup
## Repository
As you see, the repository for this web application is on Github. Please feel free to fork the project and use it for your purposes. If you feel your code can contibute please do not hesitate to submit a pull request to upload your changes or contact Justin at jolmanson2@unl.edu.

## Modules
The components for this project were set up with Node.js. You can download the latest node.js and then from a command window (cmd on windows or terminal on mac) logged in as administrator navigate out to the site project and type "npm install" this will install all node packages automatically. The packages are not synced with github because the complex directory tree can cause issues with some operating systems. That and the files should not need to be modified so there is no need to share changes. If that is needed we can explore that.

## CSS compiling
I also use gruntjs as a SASS preprocessor to CSS. This allows for the organiztion of our styling and will greatly aid in making this styles structured and work with multiple viewports.

Install Ruby Sass - in order to compile SASS you will need Ruby installed. Install it here
http://sass-lang.com/install

Afterwards run this command in your terminal/command prompt.
gem install sass

## File structure
### index.html
The site is all housed in a single index.htm file. As you will notice it is primarily a group of containers, buttons, and input boxes. The content is injected in through the JavaScript.

### js/scripts.js file.
A great deal of content is injected through the javascript code. Objects are contantly being dynamically generated and destroyed as their need ends. Someone who has a strong understandingo of JavaScript best use practices could really improve the code quality of this file.


### styles.css
The CSS was built with SASS and is taking advantage of flexbox for its display. As CSS Grid becomes accepted in more browsers this may offer more flexibility with the layout and movement of the boxes. Since our needs consisted of a grid that was scalable and allowed us to allign the content how we saw fit; flexbox seemed like a solid choice.

#Special Thanks
Thanks for the different modules
Pinyin to Chinese Character:
https://www.google.com/intl/en/inputtools/services/features/transliteration.html

Text to audio:
https://responsivevoice.org/

Image search:
https://www.flickr.com/services/api/flickr.photos.search.html

Special mention for those that provided advice/code snippets.
https://github.com/hermanschaaf/
https://github.com/tsroten
https://github.com/texh
https://www.reddit.com/user/Magnetic_Tree
http://stackoverflow.com/users/4407926/varun
https://chinese.stackexchange.com/users/17061/treesong

We apologize to any people we missed