# Empty Angular portlet

Fork this repository to create new Liferay portlet project with integrated Angular2
and bundling script generating `.war` file with deployable portlet.

## Before you start
Before you start developing your own portlet, be sure to modify files `liferay-display.xml`, `liferay-plugin-package.properties`, `liferay-portlet.xml` and `portlet.xml` in `src/main/webapp` folder – look for "Change" comments. (TODO – create simple tool to automate this task – there are too many strings to be replaced, it us prone to human error)

## Usage
Place your application in `angular` folder. By default this folder contains Angular2 application generated with `ng new` command. You can choose to start develoing from this empty template or to replace whole content of this folder with your own Angular application.

You can develop portlet by changing your directory to the `angular` and run Angular CLI.
```
cd angular
ng serve
```

When you want to build the portlet, simply run the bundling script (assume you are in the `angular` folder)
```
cd ..
./bundle.sh
```

Make sure that the script is executable. If not, simply run
```
chmod a+x bundle.sh
```

When bundling script is successfully finished,  there will be `{PORTLET_NAME}-{PORTLET_VERSION}.war` file placed in `target` folder. For more information about portlet deployment visit Liferay portlet deployment wiki page.
