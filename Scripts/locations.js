var bounds = [
    [-94.746094, 41.967659],
    [-54.672, 56.208]
]
mapboxgl.accessToken =
    'pk.eyJ1IjoiY2FsZWJzd2FuazExIiwiYSI6ImNpbnJqZWkwYzEwbWp1aWtqcGczZmxjejMifQ.sflgeSLhss3BWstoHaPyyw';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/calebswank11/ciudeyj3k00492iplc1bydyl4',
    hash: true,
    minZoom: 2,
    maxZoom: 14,
    controls: true,
    zoom: 4,
    center: [-105.49, 38.06]
});

//map.scrollZoom.disable();
//map.addControl(new mapboxgl.Navigation());
//map.scrollZoom.disable();
map.on('load', function() {
    //generics
    $('.mapSection').removeClass('hide').addClass('show');
    $('.spinner').remove();
    //end generics
    var removeFilter = $('.remove_filters'),
        allRegions = $('.all_regions'),
        centralRegion = $('.central_region'),
        northeastRegion = $('.northeast_region'),
        mountainwestRegion = $('.mountainwest_region'),
        eastRegion = $('.east_region'),
        westRegion = $('.west_region'),
        pacificRegion = $('.pacific_region'),
        closeButton = $('.map_info_window .close_btn');

    // Set Central Region as the initial filter
    //map.setFilter('ye-central-region', ['in', 'postal', 'TX', 'KS', 'MO', 'OK']);
    // map.setFilter('ye-central-region', ['in', 'postal', 'TX', 'KS', 'MO', 'OK', 'AZ', 'MI', 'GA', 'KY', 'AL']);
    //Remove all filters
  
  /////////////scroll area to top//////////////
  function scrollToTop(){
      $('html, .region_display').scrollTop(0);
    }
  ////////////////////////////////////////////
    removeFilter.click(function() {
        map.setFilter('ye-central-region', ['in', 'postal', ''])
    });

    //Show Central Regions
    centralRegion.click(function() {
      var regionTest=getLocationCookie("georgia");
            if (regionTest == ""){
              setLocationCookie('location','Central',30);}
      console.log("set");
        map.setFilter('ye-central-region', ['in', 'postal', 'TX', 'KS', 'MO', 'OK']);
        map.flyTo({
            zoom: 5.25,
            center: [-98.000, 33.503],
            speed: 1,
            bearing: 0,
            pitch: 0,
            curve: 1
        });
        //Load JSON data WHERE region is defined as CentralRegion
        //Display CentalRegion Areas LINKS
      scrollToTop();
    });

    //Show mountainwest Regions
    mountainwestRegion.click(function() {
      var regionTest=getLocationCookie("georgia");
            if (regionTest == ""){
      setLocationCookie('location','MountianWest',30);}
      console.log("set");
        map.setFilter('ye-central-region', ['in', 'postal', 'AZ']);
        map.flyTo({
            zoom: 5.5,
            center: [-112.230, 34.053],
            speed: 1,
            bearing: 0,
            pitch: 0,
            curve: 1
        });
        
         //$('html, .region_display').animate({scrollTop}, 500);                                    
        //Load JSON data WHERE region is defined as mountainwestRegion
        //Display mountainwestRegion Areas LINKS
       $('html, .region_display').scrollTop(0); 
    });

    //Show Pacific Regions
    pacificRegion.click(function() {
      var regionTest=getLocationCookie("georgia");
            if (regionTest == ""){
      setLocationCookie('location','Pacific',30);}
      console.log("set");
        map.setFilter('ye-central-region', ['in', 'postal', 'CA']);
        map.flyTo({
            zoom: 5.5,
            center: [-118.794, 37.059],
            speed: 1,
            bearing: 0,
            pitch: 0,
            curve: 1
        });
        
         //$('html, .region_display').animate({scrollTop}, 500);                                    
        //Load JSON data WHERE region is defined as mountainwestRegion
        //Display mountainwestRegion Areas LINKS
       $('html, .region_display').scrollTop(0); 
    });

    //Show East Regions
    eastRegion.click(function() {
      var regionTest=getLocationCookie("georgia");
            if (regionTest == ""){
      setLocationCookie('location','East',30);}
      console.log("set");
        map.setFilter('ye-central-region', ['in', 'postal', 'GA', 'NC', 'MI', 'KY']);
        map.flyTo({
            zoom: 5.25,
            center: [-85.051, 38.519],
            speed: 1,
            bearing: 0,
            pitch: 0,
            curve: 1
        });
      
        //Load JSON data WHERE region is defined as EastRegion
        //Display EastRegion Areas LINKS
       $('html, .region_display').scrollTop(0); 
    });

    var mapInfoWindow = $('.map_info_window'),
        regionTab = $('.region_tabs .tab'),
        mapCollapseTab = $('.map_collapse');

    //map.on('click', function (event) {
    //    var features = map.queryRenderedFeatures(event.point, { layers: ['ye-central-region'] }),
    //        mapInfoWindow = $('.map_info_window'),
    //        feature = features[0],
    //        stateName;

    //    stateName = feature.properties.name;
    //});

    regionTab.click(function(event) {
        $(this).addClass('active').siblings().removeClass('active');

        // get the region id
        var regionNodeId = $(this).attr('data-region-node-id');

        if (regionNodeId) {
            ClearSchools();
            ClearSchoolDetails();
            ClearAreaManagerDetails();
            ClearAreaOfficeDetails();

            // show region detail
            ShowRegionDetail(regionNodeId);
        }
    });

    mapCollapseTab.click(function(event) {
        $(this).toggleClass('closed');
        mapInfoWindow.toggleClass('closed');
    });

    // show central to start
    var centralTab = $('li[data-region-node-id="' + centralNodeId + '"]');
            var region=getLocationCookie("location");
            if (region != "") {
                switch (region) {
                    case 'MountianWest':
                    centralTab = $('li[data-region-node-id="' + 130 + '"]');
                    break;
                    case 'Central':
                    centralTab = $('li[data-region-node-id="' + 129 + '"]');
                    break;
                    case 'East':
                    centralTab = $('li[data-region-node-id="' + 131 + '"]');
                    break;
                }
            } 
    $(centralTab).click();
});
function setLocationCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getLocationCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


function ClearSchools() {
    // wrapping in try catch since it may not exist (i.e. initial load)
    try {
        map.removeSource('schools');
        map.removeLayer('schoolLayer');
        map.removeLayer('cluster-low');
        map.removeLayer('cluster-medium');
        map.removeLayer('cluster-high');
        map.removeLayer('cluster-count');
    } catch (e) {

    }
}

function GetFeatureForSchool(school) {
    var baseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/|query|.json?access_token=' + mapboxgl.accessToken;
    var query = '';
    var feature = {};

    // build the query
    if (school && (school != undefined)) {
        query = encodeURIComponent(school.Street + ' ' + school.City + ', ' + school.StateName + ' ' + school.Zip);
    }

    $.ajax({
        url: baseUrl.replace('|query|', query),
        type: 'GET',
        cache: false,
        async: false,
        dataType: 'json',
        success: function(json) {
            feature = json.features[0];
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log('error', textStatus, errorThrown);
        }
    });

    return feature;
}

function AddSchools(schools) {
    var schoolPoints = [];

    $(schools).each(function(key, value) {
        var longitude = value.Longitude;
        var latitude = value.Latitude;

        if ((longitude == undefined) || (latitude == undefined)) {
            var feature = GetFeatureForSchool(value);

            if (feature) {
                latitude = feature.geometry.coordinates[0];
                longitude = feature.geometry.coordinates[1];
            }
        }

        var school = {};

        school = {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [longitude, latitude]
            },
            properties: {
                "marker-symbol": "marker-15",
                "marker-size": "large",
                "title": value.SchoolLetterIndexForMap,

            }
        }

        schoolPoints.push(school);
    });
    //variables added for use in the clusters
    var highCount = 10,
        lowCount = 3;

    map.addSource("schools", {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": schoolPoints
        },
        cluster: true, // Set this true or false
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 30 // Radius of each cluster when clustering points (defaults to 50)
    });

    map.addLayer({
        "id": "schoolLayer",
        "type": "symbol",
        "source": "schools",

        "layout": {
            "icon-image": "marker-15",
            "icon-size": .75,
            "icon-allow-overlap": true,
            "icon-ignore-placement": true,
            "icon-optional": false,
            "text-allow-overlap": false,
            "text-ignore-placement": false,
            "text-optional": true,
            "text-field": "{title}",
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-offset": [0, -.9],
            "text-anchor": "top",
            "text-size": 12,
        },
         "paint": {"text-color":"white"},
        "interactive": true
    });
    ///////////////////////////
    //code for clusters
    ///////////////////////////

    // Cluster categories
    map.addLayer({
        "id": "cluster-low",
        "type": "circle",
        "source": "schools",
        // Set a filter the 'low' category
        "filter": ["<=", "point_count", lowCount],
        "layout": {},
        "paint": {
            "circle-color": "#357B1A",
            "circle-radius": 22
        },
        "interactive": true
    });
    map.addLayer({
        "id": "cluster-medium",
        "type": "circle",
        "source": "schools",
        "filter": [
            "all", [">", "point_count", lowCount],
            ["<=", "point_count", highCount]
        ],
        "layout": {},
        "paint": {
            "circle-color": "#357B1A",
            "circle-radius": 30
        },
        "interactive": true
    });
    map.addLayer({
        "id": "cluster-high",
        "type": "circle",
        "source": "schools",
        "filter": [">", "point_count", highCount],
        "layout": {},
        "paint": {
            "circle-color": "#357B1A",
            "circle-radius": 36
        },
        "interactive": true
    });

    // Finally, add a layer for the clusters' count labels
    map.addLayer({
        "id": "cluster-count",
        "type": "symbol",
        "source": "schools",
        "layout": {
            "text-field": "{point_count}",
            "text-size": 12
                //"icon-image": "marker-15",
        },
        "paint": {"text-color":"white"},
        "interactive": true
    });

    ResizeMapToFeatures(schoolPoints);
}

function ResizeMapToFeatures(schoolPoints) {
    // resize the map to the bounds of the schools
    var bounds = new mapboxgl.LngLatBounds();


    $(schoolPoints).each(function(key, value) {
        bounds.extend(value.geometry.coordinates);
    });

    if (schoolPoints.length == 1) {
        map.flyTo({ center: schoolPoints[0].geometry.coordinates, zoom: 10 });
    } else if (schoolPoints.length == 2) {
        map.fitBounds(bounds, { padding: '170' });
    } else {
        map.fitBounds(bounds, { padding: '120' });
    }
}

function ShowRegionDetail(nodeId) {
    $("[data-parent-region-node-id]").each(function() {
        var thisNodeId = $(this).attr('data-parent-region-node-id');

        if (thisNodeId == nodeId) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });

    // bind ul
    BindRegionAreas(nodeId);
}

function BindRegionAreas(nodeId) {
    var areas = [];

    $.ajax({
        url: '/api/arearegion/GetAreasByRegionNodeId?nodeId=' + nodeId,
        type: 'GET',
        cache: false,
        async: false,
        dataType: 'json',
        success: function(json) {
            $.each(json, function(key, value) {
                var area = {};

                area = {
                    AreaId: value.Components[0].DataClass.Data[0],
                    AreaName: value.Components[0].DataClass.Data[2]
                };

                areas.push(area);
            });
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log('error', textStatus, errorThrown);
        }
    });

    // clear existing
    $('.region_area_listing').html('');

    // set main label text
    $('.region_display').find('.region_name').each(function() {
        $(this).html($('.region_tabs').find('[data-region-node-id="' + nodeId + '"]').attr('data-unformatted-region-name'));

    });
    // set secondary label for Events button
    $('.regional_area_item').find('.region_name').each(function() {
        $(this).html($('.region_tabs').find('[data-region-node-id="' + nodeId + '"]').attr('data-unformatted-region-name'));
    });

    //////////////////////////////////

    // append new
    $(areas).each(function() {
        $('.region_area_listing').append("<li onclick='GetAreaDetail(this);' data-area-id='" + this.AreaId + "'>" + this.AreaName + "</li>");
    });
}


// <h4><span class="region_name"></span> Area Schools</h4>
function GetAreaDetail(element) {
    var areaId = $(element).attr('data-area-id');
    var areaManager = {};
    var areaOffice = {};
    var schools = {};
 
  var targetDiv = $('.region_display');
    $('html, .region_display ').animate({
        scrollTop: $(targetDiv).offset().top
    }, 1000);


    $.ajax({
        url: '/api/arearegion/GetAreaByAreaNodeId?areaNodeId=' + areaId,
        type: 'GET',
        cache: false,
        async: false,
        dataType: 'json',
        success: function(data) {
            if ((data) && (data.AreaManager != null)) {
                // set the area manager
                areaManager = {
                    Email: data.AreaManager.Email,
                    Phone: data.AreaManager.Phone,
                    Name: data.AreaManager.AreaManagerName
                };
            }

            // set the area office
            if (data) {
                areaOffice = {
                    Name: data.AreaName,
                    Street: data.Street,
                    City: data.City,
                    State: data.StateName,
                    Zip: data.Zip,
                    Phone: data.Phone
                };
            }

            schools = data.Schools;
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log('error', textStatus, errorThrown);
        }
    });

    // set the area manager details
    SetAreaManagerDetails(areaManager);

    // set the area office details
    SetAreaOfficeDetails(areaOffice);

    // show the school details
    if (schools.length > 0) {
        SetSchoolDetails(schools, areaOffice);
    }

    // show the schools on the map
    if (schools.length > 0) {
        ShowSchoolsOnMap(schools);
    }
}

function ShowSchoolsOnMap(schools) {
    // clear existing
    ClearSchools();

    // add new
    AddSchools(schools);
}

function ClearSchoolDetails() {
    // clear existing
    $('.region_area_schools').html('');
    $('h4.school_area').remove();
}

function SetSchoolDetails(schools, areaOffice) {
    ClearSchoolDetails();

    // if null
    if ((schools == null) || (schools.length == undefined)) {
        return; }

    $('.regions').prepend('<h4 class="school_area">'+ areaOffice['Name'] +' Area Schools</h4>');

    // add new
    $(schools).each(function(key, value) {
        var schoolElement = $('.html_models').find('.region_area_school').clone();

        // school details
        $(schoolElement).find('.school_name').html(value.Name);
        $(schoolElement).find('.school_address_street').html(value.Street);
        $(schoolElement).find('.school_address_details').html(value.City + ', ' + value.StateName + ' ' + value.Zip);
        $(schoolElement).find('.school_address_phone').html(value.Phone);
        $(schoolElement).find('.school_letter').html(value.SchoolLetterIndexForMap);

        // set teacher details
        SetTeacherDetails(schoolElement, value.Teachers);

        // add it
        $('.region_area_schools').append(schoolElement);
    });
}

function SetTeacherDetails(element, teachers) {
    $(teachers).each(function(key, value) {
        if (key == 0) {
            if ((value.Email) && (value.Email != '')) {
                var aEmail = '<a href="mailto:' + value.Email + '">' + value.Name + '</a>';

                $(element).find('.teacher_name').html(aEmail);
            } else {
                $(element).find('.teacher_name').html(value.Name);
            }
            if ((value.Phone) && (value.Phone != '')) {
                $(element).find('.teacher_phone').html(value.Phone);
            } else {
                $(element).find('.teacher_phone').hide();
            }
        }
        if (key == 1) {
            if ((value.Email) && (value.Email != '')) {
                var aEmail = '<a href="mailto:' + value.Email + '">' + value.Name + '</a>';

                $(element).find('.teacher2_name').html(aEmail);
            } else {
                $(element).find('.teacher2_name').html(value.Name);
            }
            if ((value.Phone) && (value.Phone != '')) {
                $(element).find('.teacher2_phone').html(value.Phone);
            } else {
                $(element).find('.teacher2_phone').hide();
            }
        }
    });
}

function ClearAreaManagerDetails() {
    $('.region_area_manager_and_office').hide();

    // clear existing
    $('.region_area_manager_and_office').find('.area_manager_name').html('');
    $('.region_area_manager_and_office').find('.area_manager_phone').html('');
}

function ClearAreaOfficeDetails() {
    $('.region_area_manager_and_office').hide();

    // clear existing
    $('.region_area_manager_and_office').find('.area_office_address_street').html('');
    $('.region_area_manager_and_office').find('.area_office_address_details').html('');
    $('.region_area_manager_and_office').find('.area_office_phone').html('');
    $('.region_area_manager_and_office').find('.region_name').html('');
}

function SetAreaOfficeDetails(areaOffice) {
    ClearAreaOfficeDetails();

    // set new
    if ((areaOffice.Street) && (areaOffice.Street != '')) {
        $('.region_area_manager_and_office').find('.area_office_address_street').html(areaOffice.Street);
    } else {
        $('.region_area_manager_and_office').find('.area_office_address_street').hide();
    }
    if ((areaOffice.City) && (areaOffice.City != '')) {
        $('.region_area_manager_and_office').find('.area_office_address_details').html(areaOffice.City + ', ' + areaOffice.State + ' ' + areaOffice.Zip);
    } else {
        $('.region_area_manager_and_office').find('.area_office_address_details').hide();
    }
    if ((areaOffice.Phone) && (areaOffice.Phone != '')) {
        $('.region_area_manager_and_office').find('.area_office_phone').html(areaOffice.Phone);
    } else {
        $('.region_area_manager_and_office').find('.area_office_phone').hide();
    }
    if ((areaOffice.Name) && (areaOffice.Name != '')) {
        $('.region_area_manager_and_office').find('.region_name').html(areaOffice.Name);
    } else {
        $('.region_area_manager_and_office').find('.region_name').hide();
    }

    $('.region_area_manager_and_office').show();
}

function SetAreaManagerDetails(areaManager) {
    ClearAreaManagerDetails();

    // set new
    if ((areaManager.Name) && (areaManager.Name != '')) {
        //daniel added this line to turn on area manager name if once hidden.
        $('.region_area_manager_and_office').find('.area_manager_name').show();
        $('.region_area_manager_and_office').find('.manager').show();
        ///////////
        ///////////
        if ((areaManager.Email) && (areaManager.Email != '')) {
            var aName = '<a href="mailto:' + areaManager.Email + '">' + areaManager.Name + '</a>';

            $('.region_area_manager_and_office').find('.area_manager_name').html(aName);
        } else {
            $('.region_area_manager_and_office').find('.area_manager_name').html(areaManager.Name);
        }
    } else {
        $('.region_area_manager_and_office').find('.area_manager_name').hide();
        $('.region_area_manager_and_office').find('.manager').hide();
    }
    if ((areaManager.Phone) && (areaManager.Phone != '')) {
        $('.region_area_manager_and_office').find('.area_manager_phone').html(areaManager.Phone);
    } else {
        $('.region_area_manager_and_office').find('.area_manager_phone').hide();
    }

    $('.region_area_manager_and_office').show();
}

$(document).ready(function() {
    // hide all region detail
    $("[data-parent-region-node-id]").each(function() {
        if ($(this).attr('data-parent-region-node-id') != centralNodeId) {
            $(this).hide();
        }
    });

    $('.region_area_manager_and_office').hide();
});
''