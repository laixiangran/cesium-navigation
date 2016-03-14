/*global require*/
define([
    'Cesium/Core/defined',
    'Cesium/Core/Cartesian3',
    'ViewModels/NavigationControl'
], function (
    defined,
    Cartesian3,
    NavigationControl) {
    'use strict';

    /**
     * The model for a zoom in control in the navigation control tool bar
     *
     * @alias ZoomOutNavigationControl
     * @constructor
     * @abstract
     *
     * @param {Terria} terria The Terria instance.
     */
    var ZoomOutNavigationControl = function (terria) {
        NavigationControl.apply(this, arguments);

        /**
         * Gets or sets the name of the control which is set as the control's title.
         * This property is observable.
         * @type {String}
         */
        this.name = 'Zoom Out';

        /**
         * Gets or sets the text to be displayed in the nav control. Controls that
         * have text do not display the svgIcon.
         * This property is observable.
         * @type {String}
         */
        this.text = '–';

        /**
         * Gets or sets the CSS class of the control. This property is observable.
         * @type {String}
         */
        this.cssClass = "navigation-control-icon-zoom-out";

    };

    ZoomOutNavigationControl.prototype = Object.create(NavigationControl.prototype);

    var cartesian3Scratch = new Cartesian3();

    ZoomOutNavigationControl.prototype.zoomOut = function () {
        //this.terria.analytics.logEvent('navigation', 'click', 'zoomOut');

        this.isActive = true;

        if (defined(this.terria.leaflet)) {
            this.terria.leaflet.map.zoomOut(1);
        }

//    if (defined( this.terria.cesium)) {
//        var scene =  this.terria.cesium.scene;
//        var camera = scene.camera;
//        var focus = this.getCameraFocus(scene);
//        var direction = Cartesian3.subtract(focus, camera.position, cartesian3Scratch);
//        var movementVector = Cartesian3.multiplyByScalar(direction, -2.0, cartesian3Scratch);
//        var endPosition = Cartesian3.add(camera.position, movementVector, cartesian3Scratch);
//
//        this.flyToPosition(scene, endPosition);
//    }

        if (defined(this.terria)) {
            var scene = this.terria.scene;
            var camera = scene.camera;
            var focus = this.getCameraFocus(scene);
            var direction = Cartesian3.subtract(focus, camera.position, cartesian3Scratch);
            var movementVector = Cartesian3.multiplyByScalar(direction, -2.0, cartesian3Scratch);
            var endPosition = Cartesian3.add(camera.position, movementVector, cartesian3Scratch);

            this.terria.camera.flyTo({'destination': endPosition, 'duration': 1});
        }

        // this.terria.notifyRepaintRequired();
        this.isActive = false;
    };

    /**
     * When implemented in a derived class, performs an action when the user clicks
     * on this control
     * @abstract
     * @protected
     */
    ZoomOutNavigationControl.prototype.activate = function () {
        this.zoomOut();
    };

    return ZoomOutNavigationControl;
});
