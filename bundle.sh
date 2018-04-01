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
  echo "Merging and copying files"
  cat dist/inline.*.bundle.js \
      dist/polyfills.*.bundle.js \
      dist/vendor.*.bundle.js \
      dist/main.*.bundle.js > ../src/main/webapp/js/main.js && \
  cat dist/styles.*.bundle.css > ../src/main/webapp/css/main.css
  STATUS=$?

  # clear JS and CSS
  # echo '' > ../src/main/webapp/js/main.js
  # echo '' > ../src/main/webapp/css/main.css
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