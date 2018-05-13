#!/bin/bash

STATUS=0;

echo "Building Angular application"
cd angular
npm install && ng build --prod

STATUS=$?

if [ $STATUS -ne 0 ]
then
  printf '\u274c Failed\n'
  exit 1
else
  # clear JS and CSS
  echo '' > ../src/main/webapp/js/main.js
  # echo '' > ../src/main/webapp/css/main.css

  echo "Merging and copying files"
  cat dist/runtime.*.js \
      dist/polyfills.*.js \
      dist/vendor.*.js \
      dist/main.*.js > ../src/main/webapp/js/main.js && \
  cat dist/styles.*.css > ../src/main/webapp/css/main.css
  cp -v dist/fontawesome-webfont.* ../src/main/webapp/css/
  STATUS=$?
fi


if [ $STATUS -ne 0 ]
then
  printf '\u274c Failed\n'
  exit 1
else
  echo "Building portlet archive"
  cd ..
  mvn package
fi

if [ $STATUS -ne 0 ]
then
  printf '\u274c Failed\n'
  exit 1
else
  printf "\u2714 Congratulations, your portlet archive is placed in target/ directory\n"
fi
