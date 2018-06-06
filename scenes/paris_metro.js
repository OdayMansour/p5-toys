// Setting up Window
var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0];

var sz_X = w.innerWidth || e.clientWidth || g.clientWidth;
var sz_Y = w.innerHeight|| e.clientHeight|| g.clientHeight;

var particles = []
var num_particles = 50
var linec = 0

var val_wheel = 1

var delta = {
    x: 0,
    y: 0
}
var anchor = {
    x: 0,
    y: 0
}

var val_scaler = 1

var bool_drawRER = false
var bool_drawMETRO = true

function setup() {
    
    var canvas = createCanvas(sz_X, sz_Y);
    canvas.parent('graphics');
    background(0);

    colorMode(HSB, 100);
    rectMode(CENTER);
    frameRate(60);

}

function draw() {

    background(0);

    var view_params = {
        "scale": 0.9 * sz_Y * val_scaler,// + val_wheel * 100,
        "panx": sz_X / 2.0 + delta.x,
        "pany": sz_Y / 2.0 + delta.y,
        "offset_x": 2.228536982,
        "normalise_x": 0.236028012,
        "offset_y": 48.76871513,
        "normalise_y": 0.177130532
        // "offset_x": 1.995901988,
        // "normalise_x": 0.786324736,
        // "offset_y": 48.29359177,
        // "normalise_y": 0.970352376
    }

    if (bool_drawRER) {
        view_params.offset_x = 1.995901988
        view_params.normalise_x = 0.786324736
        view_params.offset_y = 48.29359177
        view_params.normalise_y = 0.970352376

        var rer_draw_params = {
            "withlabels": false,
            "labeloffset": {
                "x": 5,
                "y": -5
            },
            "shape": rect,
            "size": 4 - val_scaler / 2
        }

        var rer_static_data = getRERstaticData();
        drawFromStaticData(rer_static_data, view_params, rer_draw_params);        
    }

    if (bool_drawMETRO) {
        var metro_draw_params = {
            "withlabels": false,
            "labeloffset": {
                "x": 5,
                "y": -5
            },
            "shape": ellipse,
            "size": 4 + val_scaler / 1.5
        }
    
        var metro_static_data = getMETROstaticData();
        drawFromStaticData(metro_static_data, view_params, metro_draw_params);
    }

}

function mouseWheel(event) {
    val_scaler = val_scaler * (1 + event.delta/10)
    
    if (val_scaler < 0.5) {
        val_scaler = 0.5
    } else if ( val_scaler > 10) {
        val_scaler = 10
    }
}

function mousePressed() {
    anchor.x = mouseX
    anchor.y = mouseY
}

function mouseDragged() {
    delta.x += mouseX - anchor.x
    delta.y += mouseY - anchor.y
    anchor.x = mouseX
    anchor.y = mouseY

}

// function mouseReleased() {
//     console.log("> Released")
//     delta.x += mouseX - anchor.x
//     delta.y += mouseY - anchor.y

//     anchor.x = mouseX
//     anchor.y = mouseY
//     console.log(anchor.x)
//     console.log(anchor.y)
//     console.log("< Released")
// }

function drawFromStaticData(static_data, view_params, draw_params) {

    var val_scale = view_params.scale
    var val_panx = view_params.panx
    var val_pany = view_params.pany
    var val_offset_x = view_params.offset_x
    var val_normalise_x = view_params.normalise_x
    var val_offset_y = view_params.offset_y
    var val_normalise_y = view_params.normalise_y

    for (i_line=0; i_line < static_data.lines.length; i_line++) {
        fill(static_data.lines[i_line].color);
        noStroke();

        for (i_station=0; i_station < static_data.lines[i_line].stations.length; i_station++) {
            draw_params.shape(
                ((static_data.lines[i_line].stations[i_station].pos_x - val_offset_x) / val_normalise_x - 0.5) * val_scale + val_panx, 
                (0.5 - (static_data.lines[i_line].stations[i_station].pos_y - val_offset_y) / val_normalise_y) * val_scale + val_pany, 
                draw_params.size,
                draw_params.size
                );
            if (draw_params.withlabels) {
                text(static_data.lines[i_line].stations[i_station].name, 
                    ((static_data.lines[i_line].stations[i_station].pos_x - val_offset_x) / val_normalise_x - 0.5) * val_scale + val_panx + draw_params.labeloffset.x, 
                    (0.5 - (static_data.lines[i_line].stations[i_station].pos_y - val_offset_y) / val_normalise_y) * val_scale + val_pany + draw_params.labeloffset.y
                    )
            }
        }

    }
}

function getMETROstaticData() {

    var static_data = { "lines": [
        { 
            "line": "1",
            "color": "#FFBE00",
            "id": "1",
            "stations": [
                {
                    "id": "2035-2154",
                    "name": "Chateau de Vincennes",
                    "pos_x": "2.440439978057246",
                    "pos_y": "48.844456394569114"
                },
                {
                    "id": "2067-2116",
                    "name": "Berault",
                    "pos_x": "2.429205166348",
                    "pos_y": "48.84547070758355"
                },
                {
                    "id": "1725-2470",
                    "name": "Saint-Mande",
                    "pos_x": "2.41947990037451",
                    "pos_y": "48.84635698889295"
                },
                {
                    "id": "1751-2429",
                    "name": "Porte de Vincennes",
                    "pos_x": "2.410140367974107",
                    "pos_y": "48.8471584794021"
                },
                {
                    "id": "1832-2371",
                    "name": "Nation",
                    "pos_x": "2.39506230542588",
                    "pos_y": "48.84847428597437"
                },
                {
                    "id": "1698-2443",
                    "name": "Reuilly-Diderot",
                    "pos_x": "2.386341706352172",
                    "pos_y": "48.84730378614119"
                },
                {
                    "id": "1955-2210",
                    "name": "Gare de Lyon",
                    "pos_x": "2.373014219940096",
                    "pos_y": "48.84398558201753"
                },
                {
                    "id": "2062-2111",
                    "name": "Bastille",
                    "pos_x": "2.369320584925386",
                    "pos_y": "48.852479422836296"
                },
                {
                    "id": "1642-2522",
                    "name": "Saint-Paul (Le Marais)",
                    "pos_x": "2.360956488661",
                    "pos_y": "48.855236252795095"
                },
                {
                    "id": "1892-2288",
                    "name": "Hotel de Ville",
                    "pos_x": "2.351577562994996",
                    "pos_y": "48.85747798252934"
                },
                {
                    "id": "2036-2155",
                    "name": "Chatelet",
                    "pos_x": "2.347305852747763",
                    "pos_y": "48.85879919807379"
                },
                {
                    "id": "1864-2331",
                    "name": "Louvre-Rivoli",
                    "pos_x": "2.341108591634067",
                    "pos_y": "48.8608062912721"
                },
                {
                    "id": "1773-2383",
                    "name": "Palais-Royal (Musee du Louvre)",
                    "pos_x": "2.336878397596706",
                    "pos_y": "48.862829672789964"
                },
                {
                    "id": "1688-2498",
                    "name": "Tuileries",
                    "pos_x": "2.330129877112861",
                    "pos_y": "48.86434377873391"
                },
                {
                    "id": "1980-2170",
                    "name": "Concorde",
                    "pos_x": "2.322943412243542",
                    "pos_y": "48.866285804583875"
                },
                {
                    "id": "2083-2544",
                    "name": "Champs-Elysees-Clemenceau",
                    "pos_x": "2.313545549946741",
                    "pos_y": "48.86790534489709"
                },
                {
                    "id": "1945-2200",
                    "name": "Franklin-Roosevelt",
                    "pos_x": "2.309505157337887",
                    "pos_y": "48.86869984735294"
                },
                {
                    "id": "1961-2216",
                    "name": "George V",
                    "pos_x": "2.300560451248797",
                    "pos_y": "48.87202380950043"
                },
                {
                    "id": "2028-2147",
                    "name": "Charles de Gaulle-Etoile",
                    "pos_x": "2.295567369745454",
                    "pos_y": "48.874613927042155"
                },
                {
                    "id": "2048-2098",
                    "name": "Argentine",
                    "pos_x": "2.289322589613774",
                    "pos_y": "48.87559404986667"
                },
                {
                    "id": "1755-2433",
                    "name": "Porte Maillot",
                    "pos_x": "2.283162242230229",
                    "pos_y": "48.87755125180425"
                },
                {
                    "id": "1856-2323",
                    "name": "Les Sablons (Jardin d'acclimatation)",
                    "pos_x": "2.271686721050983",
                    "pos_y": "48.88119152058607"
                },
                {
                    "id": "1803-2342",
                    "name": "Pont de Neuilly",
                    "pos_x": "2.260515077888117",
                    "pos_y": "48.88470820132253"
                },
                {
                    "id": "1933-2258",
                    "name": "Esplanade de la Defense",
                    "pos_x": "2.247932435324862",
                    "pos_y": "48.88863121777118"
                },
                {
                    "id": "1887-2283",
                    "name": "La Defense (Grande Arche)",
                    "pos_x": "2.237018056395014",
                    "pos_y": "48.8921870764495"
                }
            ]
        },
        {
            "line": "2",
            "color": "#0055C8",
            "id": "2",
            "stations": [
                {
                    "id": "1833-2338",
                    "name": "Nation",
                    "pos_x": "2.39506230542588",
                    "pos_y": "48.84847428597437"
                },
                {
                    "id": "2058-2107",
                    "name": "Avron",
                    "pos_x": "2.398302344267162",
                    "pos_y": "48.85151027816436"
                },
                {
                    "id": "2041-2160",
                    "name": "Alexandre-Dumas",
                    "pos_x": "2.394561944560314",
                    "pos_y": "48.85637735718154"
                },
                {
                    "id": "1788-2398",
                    "name": "Philippe Auguste",
                    "pos_x": "2.389729852353504",
                    "pos_y": "48.85846654943374"
                },
                {
                    "id": "1784-2394",
                    "name": "Pere-Lachaise",
                    "pos_x": "2.387607288151709",
                    "pos_y": "48.86265401909355"
                },
                {
                    "id": "1812-2351",
                    "name": "Menilmontant",
                    "pos_x": "2.383383250455203",
                    "pos_y": "48.86680003509802"
                },
                {
                    "id": "2079-2128",
                    "name": "Couronnes",
                    "pos_x": "2.380542585989343",
                    "pos_y": "48.86909116292499"
                },
                {
                    "id": "2087-2548",
                    "name": "Belleville",
                    "pos_x": "2.376702144728945",
                    "pos_y": "48.872310113783094"
                },
                {
                    "id": "1978-2168",
                    "name": "Colonel Fabien",
                    "pos_x": "2.370811395312745",
                    "pos_y": "48.87761018741785"
                },
                {
                    "id": "1900-2296",
                    "name": "Jaures",
                    "pos_x": "2.370262126660263",
                    "pos_y": "48.881498595910074"
                },
                {
                    "id": "1674-2484",
                    "name": "Stalingrad",
                    "pos_x": "2.36939198436133",
                    "pos_y": "48.884385145353036"
                },
                {
                    "id": "1910-2235",
                    "name": "La Chapelle",
                    "pos_x": "2.360491318526145",
                    "pos_y": "48.88439879515334"
                },
                {
                    "id": "2086-2547",
                    "name": "Barbes-Rochechouart",
                    "pos_x": "2.349774443646268",
                    "pos_y": "48.88343618805934"
                },
                {
                    "id": "2046-2096",
                    "name": "Anvers",
                    "pos_x": "2.344130633722553",
                    "pos_y": "48.88286864756839"
                },
                {
                    "id": "1791-2401",
                    "name": "Pigalle",
                    "pos_x": "2.337081682514974",
                    "pos_y": "48.882519385636314"
                },
                {
                    "id": "2071-2120",
                    "name": "Blanche",
                    "pos_x": "2.331926590885041",
                    "pos_y": "48.88395857351673"
                },
                {
                    "id": "1795-2405",
                    "name": "Place de Clichy",
                    "pos_x": "2.327839556114741",
                    "pos_y": "48.88361499223493"
                },
                {
                    "id": "1707-2452",
                    "name": "Rome",
                    "pos_x": "2.321274926766349",
                    "pos_y": "48.88222690081934"
                },
                {
                    "id": "1629-2509",
                    "name": "Villiers",
                    "pos_x": "2.315176626220464",
                    "pos_y": "48.881150028474686"
                },
                {
                    "id": "1822-2361",
                    "name": "Monceau",
                    "pos_x": "2.309451167991542",
                    "pos_y": "48.8804494561385"
                },
                {
                    "id": "1989-2179",
                    "name": "Courcelles",
                    "pos_x": "2.303528725370108",
                    "pos_y": "48.879214134245586"
                },
                {
                    "id": "1684-2494",
                    "name": "Ternes",
                    "pos_x": "2.298310375124943",
                    "pos_y": "48.877972701427545"
                },
                {
                    "id": "2029-2148",
                    "name": "Charles de Gaulle-Etoile",
                    "pos_x": "2.295567369745454",
                    "pos_y": "48.874613927042155"
                },
                {
                    "id": "1694-2504",
                    "name": "Victor Hugo",
                    "pos_x": "2.285335094686169",
                    "pos_y": "48.86979855646068"
                },
                {
                    "id": "1736-2414",
                    "name": "Porte Dauphine (Marechal de Lattre de Tassigny)",
                    "pos_x": "2.277083017052586",
                    "pos_y": "48.87146657812765"
                }
            ]
        },
        {
            "line": "3",
            "color": "#6E6E00",
            "id": "3",
            "stations": [
                {
                    "id": "1949-2204",
                    "name": "Gallieni (Parc de Bagnolet)",
                    "pos_x": "2.41669727285771",
                    "pos_y": "48.865335317260985"
                },
                {
                    "id": "1737-2415",
                    "name": "Porte de Bagnolet",
                    "pos_x": "2.408031037075815",
                    "pos_y": "48.864600373375616"
                },
                {
                    "id": "1950-2205",
                    "name": "Gambetta",
                    "pos_x": "2.398746593442592",
                    "pos_y": "48.86516343488148"
                },
                {
                    "id": "1785-2395",
                    "name": "Pere-Lachaise",
                    "pos_x": "2.387607288151709",
                    "pos_y": "48.86265401909355"
                },
                {
                    "id": "1728-2471",
                    "name": "Rue Saint-Maur",
                    "pos_x": "2.380797986183677",
                    "pos_y": "48.864086574750985"
                },
                {
                    "id": "1779-2389",
                    "name": "Parmentier",
                    "pos_x": "2.374581969996412",
                    "pos_y": "48.865253786054325"
                },
                {
                    "id": "1766-2376",
                    "name": "Republique",
                    "pos_x": "2.363826143977408",
                    "pos_y": "48.86750342377884"
                },
                {
                    "id": "1683-2493",
                    "name": "Temple",
                    "pos_x": "2.361541532068171",
                    "pos_y": "48.86668268024132"
                },
                {
                    "id": "2050-2099",
                    "name": "Arts-et-Metiers",
                    "pos_x": "2.356729869173701",
                    "pos_y": "48.865322711678054"
                },
                {
                    "id": "1765-2375",
                    "name": "Reaumur-Sebastopol",
                    "pos_x": "2.35206831805007",
                    "pos_y": "48.866340299288545"
                },
                {
                    "id": "1662-2542",
                    "name": "Sentier",
                    "pos_x": "2.347516213278753",
                    "pos_y": "48.86730947497152"
                },
                {
                    "id": "2007-2196",
                    "name": "Bourse",
                    "pos_x": "2.340720723674097",
                    "pos_y": "48.868695977842876"
                },
                {
                    "id": "1760-2438",
                    "name": "Quatre Septembre",
                    "pos_x": "2.336218847521674",
                    "pos_y": "48.869585243484515"
                },
                {
                    "id": "1846-2313",
                    "name": "Opera",
                    "pos_x": "2.331989522683248",
                    "pos_y": "48.8709917839485"
                },
                {
                    "id": "1889-2285",
                    "name": "Havre-Caumartin",
                    "pos_x": "2.327695409630174",
                    "pos_y": "48.87371340670774"
                },
                {
                    "id": "1722-2467",
                    "name": "Saint-Lazare",
                    "pos_x": "2.324574810293918",
                    "pos_y": "48.87500639805501"
                },
                {
                    "id": "1935-2260",
                    "name": "Europe",
                    "pos_x": "2.322265213118896",
                    "pos_y": "48.87877036848683"
                },
                {
                    "id": "1630-2510",
                    "name": "Villiers",
                    "pos_x": "2.315176626220464",
                    "pos_y": "48.881150028474686"
                },
                {
                    "id": "1881-2277",
                    "name": "Malesherbes",
                    "pos_x": "2.309052264550479",
                    "pos_y": "48.88289191745413"
                },
                {
                    "id": "1634-2514",
                    "name": "Wagram",
                    "pos_x": "2.304674440528396",
                    "pos_y": "48.883809201233376"
                },
                {
                    "id": "1786-2396",
                    "name": "Pereire",
                    "pos_x": "2.297724346480178",
                    "pos_y": "48.88489625515051"
                },
                {
                    "id": "1738-2416",
                    "name": "Porte de Champerret",
                    "pos_x": "2.292582314102913",
                    "pos_y": "48.885793105231"
                },
                {
                    "id": "1862-2329",
                    "name": "Louise Michel",
                    "pos_x": "2.288083633048504",
                    "pos_y": "48.88870601977514"
                },
                {
                    "id": "2044-2163",
                    "name": "Anatole-France",
                    "pos_x": "2.285009502746195",
                    "pos_y": "48.89208278597479"
                },
                {
                    "id": "1802-2341",
                    "name": "Pont de Levallois-Becon",
                    "pos_x": "2.279809586693102",
                    "pos_y": "48.89782106711132"
                }
            ]
        },
        {
            "line": "3b",
            "color": "#82C8E6",
            "id": "3b",
            "stations": [
                {
                    "id": "1752-2430",
                    "name": "Porte des Lilas",
                    "pos_x": "2.406480156998486",
                    "pos_y": "48.87717481930547"
                },
                {
                    "id": "1718-2463",
                    "name": "Saint-Fargeau",
                    "pos_x": "2.404514942379104",
                    "pos_y": "48.872101442131545"
                },
                {
                    "id": "1783-2393",
                    "name": "Pelleport",
                    "pos_x": "2.401561712742541",
                    "pos_y": "48.86844016327547"
                },
                {
                    "id": "1659-2539",
                    "name": "Gambetta",
                    "pos_x": "2.398746593442592",
                    "pos_y": "48.86516343488148"
                }
            ]
        },
        {
            "line": "4",
            "color": "#A0006E",
            "id": "4",
            "stations": [
                {
                    "id": "1742-2420",
                    "name": "Porte de Clignancourt",
                    "pos_x": "2.344847748752398",
                    "pos_y": "48.89740222289809"
                },
                {
                    "id": "1668-2478",
                    "name": "Simplon",
                    "pos_x": "2.347765501718976",
                    "pos_y": "48.89394138802911"
                },
                {
                    "id": "1655-2535",
                    "name": "Marcadet-Poissonniers",
                    "pos_x": "2.349738407022142",
                    "pos_y": "48.89141683421295"
                },
                {
                    "id": "2033-2152",
                    "name": "Chateau Rouge",
                    "pos_x": "2.349694082202741",
                    "pos_y": "48.887374910553596"
                },
                {
                    "id": "2061-2110",
                    "name": "Barbes-Rochechouart",
                    "pos_x": "2.349774443646268",
                    "pos_y": "48.88343618805934"
                },
                {
                    "id": "1957-2212",
                    "name": "Gare du Nord",
                    "pos_x": "2.357459346588717",
                    "pos_y": "48.87985014251205"
                },
                {
                    "id": "1953-2208",
                    "name": "Gare de l'Est (Verdun)",
                    "pos_x": "2.357880771925327",
                    "pos_y": "48.8759910648072"
                },
                {
                    "id": "2034-2153",
                    "name": "Chateau d'Eau",
                    "pos_x": "2.356044907672176",
                    "pos_y": "48.872424914488995"
                },
                {
                    "id": "1677-2487",
                    "name": "Strasbourg-Saint-Denis",
                    "pos_x": "2.354603790697162",
                    "pos_y": "48.8692241716524"
                },
                {
                    "id": "1764-2374",
                    "name": "Reaumur-Sebastopol",
                    "pos_x": "2.35206831805007",
                    "pos_y": "48.866340299288545"
                },
                {
                    "id": "1934-2259",
                    "name": "Etienne Marcel",
                    "pos_x": "2.348880652588476",
                    "pos_y": "48.863807437781254"
                },
                {
                    "id": "1855-2322",
                    "name": "Les Halles",
                    "pos_x": "2.345673828222722",
                    "pos_y": "48.8623162786956"
                },
                {
                    "id": "1964-2219",
                    "name": "Chatelet",
                    "pos_x": "2.347305852747763",
                    "pos_y": "48.85879919807379"
                },
                {
                    "id": "1975-2230",
                    "name": "Cite",
                    "pos_x": "2.347321315727239",
                    "pos_y": "48.854936376552644"
                },
                {
                    "id": "1729-2472",
                    "name": "Saint-Michel",
                    "pos_x": "2.343285978923924",
                    "pos_y": "48.853167984890604"
                },
                {
                    "id": "1845-2312",
                    "name": "Odeon",
                    "pos_x": "2.339727781593096",
                    "pos_y": "48.85230076309423"
                },
                {
                    "id": "1721-2466",
                    "name": "Saint-Germain des Pres",
                    "pos_x": "2.333776136855683",
                    "pos_y": "48.85371893399261"
                },
                {
                    "id": "1733-2411",
                    "name": "Saint-Sulpice",
                    "pos_x": "2.331256291370013",
                    "pos_y": "48.851672245619895"
                },
                {
                    "id": "1731-2442",
                    "name": "Saint-Placide",
                    "pos_x": "2.326792785039299",
                    "pos_y": "48.84687823795213"
                },
                {
                    "id": "1824-2363",
                    "name": "Montparnasse-Bienvenue",
                    "pos_x": "2.324397012397453",
                    "pos_y": "48.84378130483655"
                },
                {
                    "id": "1692-2502",
                    "name": "Vavin",
                    "pos_x": "2.329008926235403",
                    "pos_y": "48.84221841361352"
                },
                {
                    "id": "1645-2525",
                    "name": "Raspail",
                    "pos_x": "2.330754192086216",
                    "pos_y": "48.838964280710556"
                },
                {
                    "id": "1996-2185",
                    "name": "Denfert-Rochereau",
                    "pos_x": "2.331740130985349",
                    "pos_y": "48.833450858213496"
                },
                {
                    "id": "1828-2367",
                    "name": "Mouton-Duvernet",
                    "pos_x": "2.329705012620185",
                    "pos_y": "48.831112660375325"
                },
                {
                    "id": "2040-2159",
                    "name": "Alesia",
                    "pos_x": "2.327164649607824",
                    "pos_y": "48.82818847631351"
                },
                {
                    "id": "1735-2413",
                    "name": "Porte d'Orleans (General Leclerc)",
                    "pos_x": "2.325575636212245",
                    "pos_y": "48.82341162898738"
                },
                {
                    "id": "4028973-4028974",
                    "name": "Mairie de Montrouge",
                    "pos_x": "2.319740313298555",
                    "pos_y": "48.818676409912605"
                }
            ]
        },
        {
            "line": "5",
            "color": "#FF5A00",
            "id": "5",
            "stations": [
                {
                    "id": "2089-2550",
                    "name": "Bobigny-Pablo-Picasso",
                    "pos_x": "2.449189904488852",
                    "pos_y": "48.90637477027001"
                },
                {
                    "id": "2072-2121",
                    "name": "Bobigny-Pantin (Raymond Queneau)",
                    "pos_x": "2.425326888802467",
                    "pos_y": "48.89545467304617"
                },
                {
                    "id": "1932-2257",
                    "name": "Eglise de Pantin",
                    "pos_x": "2.41331313951059",
                    "pos_y": "48.89325758997389"
                },
                {
                    "id": "1891-2287",
                    "name": "Hoche",
                    "pos_x": "2.402352142536798",
                    "pos_y": "48.89122859319665"
                },
                {
                    "id": "1746-2424",
                    "name": "Porte de Pantin",
                    "pos_x": "2.392113697756401",
                    "pos_y": "48.88850368786184"
                },
                {
                    "id": "1772-2382",
                    "name": "Ourcq",
                    "pos_x": "2.386960017135177",
                    "pos_y": "48.887134869076554"
                },
                {
                    "id": "1922-2247",
                    "name": "Laumiere",
                    "pos_x": "2.379663077480466",
                    "pos_y": "48.8852161820946"
                },
                {
                    "id": "1901-2297",
                    "name": "Jaures",
                    "pos_x": "2.370262126660263",
                    "pos_y": "48.881498595910074"
                },
                {
                    "id": "1675-2485",
                    "name": "Stalingrad",
                    "pos_x": "2.36939198436133",
                    "pos_y": "48.884385145353036"
                },
                {
                    "id": "1958-2213",
                    "name": "Gare du Nord",
                    "pos_x": "2.357459346588717",
                    "pos_y": "48.87985014251205"
                },
                {
                    "id": "2076-2125",
                    "name": "Gare de l'Est (Verdun)",
                    "pos_x": "2.357880771925327",
                    "pos_y": "48.8759910648072"
                },
                {
                    "id": "1898-2294",
                    "name": "Jacques-Bonsergent",
                    "pos_x": "2.361027466917372",
                    "pos_y": "48.87080998002082"
                },
                {
                    "id": "1767-2377",
                    "name": "Republique",
                    "pos_x": "2.363826143977408",
                    "pos_y": "48.86750342377884"
                },
                {
                    "id": "1843-2310",
                    "name": "Oberkampf",
                    "pos_x": "2.368410025658025",
                    "pos_y": "48.864657879612494"
                },
                {
                    "id": "1700-2445",
                    "name": "Richard-Lenoir",
                    "pos_x": "2.371913980089996",
                    "pos_y": "48.85987362437059"
                },
                {
                    "id": "2008-2164",
                    "name": "Breguet-Sabin",
                    "pos_x": "2.370209338414258",
                    "pos_y": "48.85614070934924"
                },
                {
                    "id": "2063-2112",
                    "name": "Bastille",
                    "pos_x": "2.369320584925386",
                    "pos_y": "48.852479422836296"
                },
                {
                    "id": "1759-2437",
                    "name": "Quai de la Rapee",
                    "pos_x": "2.365873469406567",
                    "pos_y": "48.8465154041934"
                },
                {
                    "id": "1951-2206",
                    "name": "Gare d'Austerlitz",
                    "pos_x": "2.365184812004335",
                    "pos_y": "48.84243679702547"
                },
                {
                    "id": "1641-2521",
                    "name": "Saint-Marcel",
                    "pos_x": "2.360967167698855",
                    "pos_y": "48.83842729696758"
                },
                {
                    "id": "2017-2136",
                    "name": "Campo-Formio",
                    "pos_x": "2.358823489097101",
                    "pos_y": "48.83549535538261"
                },
                {
                    "id": "1793-2403",
                    "name": "Place d'Italie",
                    "pos_x": "2.35558027407791",
                    "pos_y": "48.83097267298836"
                }
            ]
        },
        {
            "line": "6",
            "color": "#82DC73",
            "id": "6",
            "stations": [
                {
                    "id": "1834-2339",
                    "name": "Nation",
                    "pos_x": "2.39506230542588",
                    "pos_y": "48.84847428597437"
                },
                {
                    "id": "1789-2399",
                    "name": "Picpus",
                    "pos_x": "2.401289019827348",
                    "pos_y": "48.8450615799449"
                },
                {
                    "id": "2065-2114",
                    "name": "Bel-Air",
                    "pos_x": "2.400918538121599",
                    "pos_y": "48.84133825093756"
                },
                {
                    "id": "2081-2094",
                    "name": "Daumesnil (Felix Eboue)",
                    "pos_x": "2.395703289436394",
                    "pos_y": "48.839549645568674"
                },
                {
                    "id": "2082-2543",
                    "name": "Dugommier",
                    "pos_x": "2.389620011336723",
                    "pos_y": "48.839041143700065"
                },
                {
                    "id": "2068-2117",
                    "name": "Bercy",
                    "pos_x": "2.379554011203435",
                    "pos_y": "48.840001389548114"
                },
                {
                    "id": "1644-2524",
                    "name": "Quai de la Gare",
                    "pos_x": "2.372825721828786",
                    "pos_y": "48.837045119244316"
                },
                {
                    "id": "1974-2229",
                    "name": "Chevaleret",
                    "pos_x": "2.368126329061812",
                    "pos_y": "48.83494772234805"
                },
                {
                    "id": "1836-2303",
                    "name": "Nationale",
                    "pos_x": "2.362856399519012",
                    "pos_y": "48.833216719709846"
                },
                {
                    "id": "1794-2404",
                    "name": "Place d'Italie",
                    "pos_x": "2.35558027407791",
                    "pos_y": "48.83097267298836"
                },
                {
                    "id": "1987-2177",
                    "name": "Corvisart",
                    "pos_x": "2.350414872010464",
                    "pos_y": "48.82979051369296"
                },
                {
                    "id": "1962-2217",
                    "name": "Glaciere",
                    "pos_x": "2.343511657749776",
                    "pos_y": "48.831129548026645"
                },
                {
                    "id": "1640-2520",
                    "name": "Saint-Jacques",
                    "pos_x": "2.337135190607983",
                    "pos_y": "48.832900816544466"
                },
                {
                    "id": "1997-2186",
                    "name": "Denfert-Rochereau",
                    "pos_x": "2.331740130985349",
                    "pos_y": "48.833450858213496"
                },
                {
                    "id": "1763-2409",
                    "name": "Raspail",
                    "pos_x": "2.330754192086216",
                    "pos_y": "48.838964280710556"
                },
                {
                    "id": "1930-2255",
                    "name": "Edgar-Quinet",
                    "pos_x": "2.326384610792847",
                    "pos_y": "48.840663229299565"
                },
                {
                    "id": "1825-2364",
                    "name": "Montparnasse-Bienvenue",
                    "pos_x": "2.324397012397453",
                    "pos_y": "48.84378130483655"
                },
                {
                    "id": "1781-2391",
                    "name": "Pasteur",
                    "pos_x": "2.312447513065986",
                    "pos_y": "48.84287127500633"
                },
                {
                    "id": "1665-2475",
                    "name": "Sevres-Lecourbe",
                    "pos_x": "2.309531490098375",
                    "pos_y": "48.84562696673932"
                },
                {
                    "id": "2016-2135",
                    "name": "Cambronne",
                    "pos_x": "2.30296829919196",
                    "pos_y": "48.84750708110547"
                },
                {
                    "id": "1657-2537",
                    "name": "La Motte-Picquet-Grenelle",
                    "pos_x": "2.298930911748061",
                    "pos_y": "48.84874166571782"
                },
                {
                    "id": "1926-2251",
                    "name": "Dupleix",
                    "pos_x": "2.293612439913189",
                    "pos_y": "48.85043454902951"
                },
                {
                    "id": "2069-2118",
                    "name": "Bir-Hakeim (Grenelle)",
                    "pos_x": "2.289334532766542",
                    "pos_y": "48.85394260711305"
                },
                {
                    "id": "1780-2390",
                    "name": "Passy",
                    "pos_x": "2.285812444134081",
                    "pos_y": "48.857448690975104"
                },
                {
                    "id": "1687-2497",
                    "name": "Trocadero",
                    "pos_x": "2.286243170691258",
                    "pos_y": "48.86306502022607"
                },
                {
                    "id": "2073-2122",
                    "name": "Boissiere",
                    "pos_x": "2.290058834931356",
                    "pos_y": "48.86698311035682"
                },
                {
                    "id": "1909-2234",
                    "name": "Kleber",
                    "pos_x": "2.293524290341821",
                    "pos_y": "48.87164976914353"
                },
                {
                    "id": "2030-2149",
                    "name": "Charles de Gaulle-Etoile",
                    "pos_x": "2.295567369745454",
                    "pos_y": "48.874613927042155"
                }
            ]
        },
        {
            "line": "7",
            "color": "#FF82B4",
            "id": "7",
            "stations": [
                {
                    "id": "1911-2236",
                    "name": "La Courneuve-8-Mai-1945",
                    "pos_x": "2.410598613730138",
                    "pos_y": "48.920785969948675"
                },
                {
                    "id": "1944-2199",
                    "name": "Fort d'Aubervilliers",
                    "pos_x": "2.404409087427758",
                    "pos_y": "48.91494975637021"
                },
                {
                    "id": "2055-2104",
                    "name": "Aubervilliers Pantin (4 Chemins)",
                    "pos_x": "2.392287059642348",
                    "pos_y": "48.903759930170864"
                },
                {
                    "id": "1744-2422",
                    "name": "Porte de la Villette",
                    "pos_x": "2.385508387679288",
                    "pos_y": "48.89738989068259"
                },
                {
                    "id": "1985-2175",
                    "name": "Corentin-Cariou",
                    "pos_x": "2.382522343415364",
                    "pos_y": "48.89483646840174"
                },
                {
                    "id": "2080-2093",
                    "name": "Crimee",
                    "pos_x": "2.377315755595574",
                    "pos_y": "48.89078896952844"
                },
                {
                    "id": "1703-2448",
                    "name": "Riquet",
                    "pos_x": "2.374204012035863",
                    "pos_y": "48.88826761697049"
                },
                {
                    "id": "1676-2486",
                    "name": "Stalingrad",
                    "pos_x": "2.36939198436133",
                    "pos_y": "48.884385145353036"
                },
                {
                    "id": "1860-2327",
                    "name": "Louis Blanc",
                    "pos_x": "2.365544319172476",
                    "pos_y": "48.88128581185832"
                },
                {
                    "id": "2085-2546",
                    "name": "Chateau Landon",
                    "pos_x": "2.362160071922951",
                    "pos_y": "48.878565625799595"
                },
                {
                    "id": "1954-2209",
                    "name": "Gare de l'Est (Verdun)",
                    "pos_x": "2.357880771925327",
                    "pos_y": "48.8759910648072"
                },
                {
                    "id": "1800-2373",
                    "name": "Poissonniere",
                    "pos_x": "2.349293902476005",
                    "pos_y": "48.87723631913661"
                },
                {
                    "id": "2015-2134",
                    "name": "Cadet",
                    "pos_x": "2.344126030464426",
                    "pos_y": "48.87589068189371"
                },
                {
                    "id": "1849-2316",
                    "name": "Le Peletier",
                    "pos_x": "2.34019988438517",
                    "pos_y": "48.87487434337737"
                },
                {
                    "id": "1971-2226",
                    "name": "Chaussee d'Antin (La Fayette)",
                    "pos_x": "2.333451218577799",
                    "pos_y": "48.87310927430917"
                },
                {
                    "id": "1847-2314",
                    "name": "Opera",
                    "pos_x": "2.331989522683248",
                    "pos_y": "48.8709917839485"
                },
                {
                    "id": "1757-2435",
                    "name": "Pyramides",
                    "pos_x": "2.33418954196825",
                    "pos_y": "48.86590673959416"
                },
                {
                    "id": "1774-2384",
                    "name": "Palais-Royal (Musee du Louvre)",
                    "pos_x": "2.336878397596706",
                    "pos_y": "48.862829672789964"
                },
                {
                    "id": "1806-2345",
                    "name": "Pont Neuf",
                    "pos_x": "2.342232759368107",
                    "pos_y": "48.85855382636668"
                },
                {
                    "id": "1966-2221",
                    "name": "Chatelet",
                    "pos_x": "2.347305852747763",
                    "pos_y": "48.85879919807379"
                },
                {
                    "id": "1805-2344",
                    "name": "Pont Marie (Cite des Arts)",
                    "pos_x": "2.357162571618337",
                    "pos_y": "48.853575472503586"
                },
                {
                    "id": "1681-2491",
                    "name": "Sully-Morland",
                    "pos_x": "2.36198514100077",
                    "pos_y": "48.85123768038418"
                },
                {
                    "id": "1907-2232",
                    "name": "Jussieu",
                    "pos_x": "2.35505026306104",
                    "pos_y": "48.845950666642075"
                },
                {
                    "id": "1649-2529",
                    "name": "Place Monge (Jardin des Plantes)",
                    "pos_x": "2.352224728183084",
                    "pos_y": "48.84286683068266"
                },
                {
                    "id": "2020-2139",
                    "name": "Censier-Daubenton",
                    "pos_x": "2.351739487166927",
                    "pos_y": "48.8404866526412"
                },
                {
                    "id": "1854-2321",
                    "name": "Les Gobelins",
                    "pos_x": "2.352588925635323",
                    "pos_y": "48.83586348417992"
                },
                {
                    "id": "1648-2528",
                    "name": "Place d'Italie",
                    "pos_x": "2.35558027407791",
                    "pos_y": "48.83097267298836"
                },
                {
                    "id": "1685-2495",
                    "name": "Tolbiac",
                    "pos_x": "2.357245650758686",
                    "pos_y": "48.826426010875664"
                },
                {
                    "id": "1876-2272",
                    "name": "Maison Blanche",
                    "pos_x": "2.358473883854336",
                    "pos_y": "48.8224378345855"
                },
                {
                    "id": "1808-2347",
                    "name": "Porte d'Italie",
                    "pos_x": "2.359705216746021",
                    "pos_y": "48.819223349609054"
                },
                {
                    "id": "1740-2418",
                    "name": "Porte de Choisy",
                    "pos_x": "2.364531951747296",
                    "pos_y": "48.81987622104988"
                },
                {
                    "id": "1734-2412",
                    "name": "Porte d'Ivry",
                    "pos_x": "2.369290587346029",
                    "pos_y": "48.82135578381408"
                },
                {
                    "id": "1790-2400",
                    "name": "Pierre et Marie Curie",
                    "pos_x": "2.377267200151936",
                    "pos_y": "48.81593076304922"
                },
                {
                    "id": "1871-2301",
                    "name": "Mairie d'Ivry",
                    "pos_x": "2.383551479649113",
                    "pos_y": "48.81109919771153"
                },
                {
                    "id": "1925-2250",
                    "name": "Le Kremlin-Bicetre",
                    "pos_x": "2.362263387127349",
                    "pos_y": "48.81012995727393"
                },
                {
                    "id": "1639-2519",
                    "name": "Villejuif-Leo Lagrange",
                    "pos_x": "2.363953196602166",
                    "pos_y": "48.804688120911365"
                },
                {
                    "id": "1696-2506",
                    "name": "Villejuif-Paul Vaillant Couturier (Hopital Paul Brousse)",
                    "pos_x": "2.36826954143277",
                    "pos_y": "48.796483082759046"
                },
                {
                    "id": "1695-2505",
                    "name": "Villejuif-Louis Aragon",
                    "pos_x": "2.367804106975457",
                    "pos_y": "48.78756279205349"
                }
            ]
        },
        {
            "line": "7b",
            "color": "#82DC73",
            "id": "7b",
            "stations": [
                {
                    "id": "1756-2434",
                    "name": "Pre-Saint-Gervais",
                    "pos_x": "2.398946662455969",
                    "pos_y": "48.879995794367346"
                },
                {
                    "id": "1635-",
                    "name": "Danube",
                    "pos_x": "2.393445456490355",
                    "pos_y": "48.881931998728206"
                },
                {
                    "id": "2002-2191",
                    "name": "Botzaris",
                    "pos_x": "2.389115807376888",
                    "pos_y": "48.87948177191293"
                },
                {
                    "id": "2013-2132",
                    "name": "Buttes-Chaumont",
                    "pos_x": "2.381614511939643",
                    "pos_y": "48.87851411312453"
                },
                {
                    "id": "2075-2124",
                    "name": "Bolivar",
                    "pos_x": "2.374147153839052",
                    "pos_y": "48.88082126137613"
                },
                {
                    "id": "1902-2298",
                    "name": "Jaures",
                    "pos_x": "2.370262126660263",
                    "pos_y": "48.881498595910074"
                },
                {
                    "id": "1861-2328",
                    "name": "Louis Blanc",
                    "pos_x": "2.365544319172476",
                    "pos_y": "48.88128581185832"
                },
                {
                    "id": "-1797",
                    "name": "Place des Fetes",
                    "pos_x": "2.392983964817394",
                    "pos_y": "48.876949848110215"
                }
            ]
        },
        {
            "line": "8",
            "color": "#D282BE",
            "id": "8",
            "stations": [
                    {
                    "id": "3343334-3343335",
                    "name": "Balard",
                    "pos_x": "2.278161671278975",
                    "pos_y": "48.83593087919467"
                },
                {
                    "id": "3343336-3343337",
                    "name": "Lourmel",
                    "pos_x": "2.282700027239131",
                    "pos_y": "48.838960939372015"
                },
                {
                    "id": "3343338-3343339",
                    "name": "Boucicaut",
                    "pos_x": "2.287945766499665",
                    "pos_y": "48.8410940563496"
                },
                {
                    "id": "3343746-3343752",
                    "name": "Felix Faure",
                    "pos_x": "2.291912413317875",
                    "pos_y": "48.842746779792876"
                },
                {
                    "id": "3343753-3343754",
                    "name": "Commerce",
                    "pos_x": "2.293951963636534",
                    "pos_y": "48.84479476461109"
                },
                {
                    "id": "3343755-3343756",
                    "name": "La Motte-Picquet-Grenelle",
                    "pos_x": "2.298930911748061",
                    "pos_y": "48.84874166571782"
                },
                {
                    "id": "3343757-3343758",
                    "name": "Ecole Militaire",
                    "pos_x": "2.306097403704285",
                    "pos_y": "48.85468215688774"
                },
                {
                    "id": "3343759-3343760",
                    "name": "La Tour-Maubourg",
                    "pos_x": "2.310565960946846",
                    "pos_y": "48.85772541289345"
                },
                {
                    "id": "3343761-3343762",
                    "name": "Invalides",
                    "pos_x": "2.313909577788542",
                    "pos_y": "48.862364704125895"
                },
                {
                    "id": "3343763-3343764",
                    "name": "Concorde",
                    "pos_x": "2.322943412243542",
                    "pos_y": "48.866285804583875"
                },
                {
                    "id": "3343765-3343766",
                    "name": "Madeleine",
                    "pos_x": "2.326272274027749",
                    "pos_y": "48.86963317302491"
                },
                {
                    "id": "3343767-3343768",
                    "name": "Opera",
                    "pos_x": "2.331989522683248",
                    "pos_y": "48.8709917839485"
                },
                {
                    "id": "3343769-3343770",
                    "name": "Richelieu-Drouot",
                    "pos_x": "2.339115039269688",
                    "pos_y": "48.8721523525874"
                },
                {
                    "id": "3343771-3343772",
                    "name": "Grands Boulevards",
                    "pos_x": "2.343154773075233",
                    "pos_y": "48.87149773935003"
                },
                {
                    "id": "3343773-3343774",
                    "name": "Bonne Nouvelle",
                    "pos_x": "2.350497971863092",
                    "pos_y": "48.87016420090056"
                },
                {
                    "id": "3343775-3343776",
                    "name": "Strasbourg-Saint-Denis",
                    "pos_x": "2.354603790697162",
                    "pos_y": "48.8692241716524"
                },
                {
                    "id": "3343777-3343778",
                    "name": "Republique",
                    "pos_x": "2.363826143977408",
                    "pos_y": "48.86750342377884"
                },
                {
                    "id": "3343779-3343780",
                    "name": "Filles du Calvaire",
                    "pos_x": "2.366661094716491",
                    "pos_y": "48.8632579449661"
                },
                {
                    "id": "3343781-3343782",
                    "name": "Saint-Sebastien-Froissart",
                    "pos_x": "2.367210866411708",
                    "pos_y": "48.861168865487805"
                },
                {
                    "id": "3343783-3343784",
                    "name": "Chemin Vert",
                    "pos_x": "2.368108290701383",
                    "pos_y": "48.85742003754715"
                },
                {
                    "id": "3343785-3343786",
                    "name": "Bastille",
                    "pos_x": "2.369320584925386",
                    "pos_y": "48.852479422836296"
                },
                {
                    "id": "3343787-3343788",
                    "name": "Ledru-Rollin",
                    "pos_x": "2.376118773339345",
                    "pos_y": "48.851271126365226"
                },
                {
                    "id": "3343789-3343790",
                    "name": "Faidherbe-Chaligny",
                    "pos_x": "2.384092210066296",
                    "pos_y": "48.850177861900356"
                },
                {
                    "id": "3343791-3343792",
                    "name": "Reuilly-Diderot",
                    "pos_x": "2.386341706352172",
                    "pos_y": "48.84730378614119"
                },
                {
                    "id": "3343793-3343794",
                    "name": "Montgallet",
                    "pos_x": "2.39007511282003",
                    "pos_y": "48.844408672078906"
                },
                {
                    "id": "3343795-3343796",
                    "name": "Daumesnil (Felix Eboue)",
                    "pos_x": "2.395703289436394",
                    "pos_y": "48.839549645568674"
                },
                {
                    "id": "3343797-3343798",
                    "name": "Michel Bizot",
                    "pos_x": "2.402333165917444",
                    "pos_y": "48.83711700699553"
                },
                {
                    "id": "3343799-3343800",
                    "name": "Porte Doree",
                    "pos_x": "2.405383210626771",
                    "pos_y": "48.8347851580814"
                },
                {
                    "id": "3343801-3343802",
                    "name": "Porte de Charenton",
                    "pos_x": "2.401448054218978",
                    "pos_y": "48.83316292950388"
                },
                {
                    "id": "3343803-3343804",
                    "name": "Liberte",
                    "pos_x": "2.406742225927992",
                    "pos_y": "48.82605499654801"
                },
                {
                    "id": "3343805-3343806",
                    "name": "Charenton-Ecoles",
                    "pos_x": "2.413737517516731",
                    "pos_y": "48.82159576732173"
                },
                {
                    "id": "3343807-3343808",
                    "name": "Ecole Veterinaire de Maisons-Alfort",
                    "pos_x": "2.422376142845623",
                    "pos_y": "48.814803007000464"
                },
                {
                    "id": "3343809-3343810",
                    "name": "Maisons-Alfort-Stade",
                    "pos_x": "2.434509895933692",
                    "pos_y": "48.809144360936045"
                },
                {
                    "id": "3343811-3343812",
                    "name": "Maisons-Alfort-Les Juilliottes",
                    "pos_x": "2.446927484242136",
                    "pos_y": "48.802637690718086"
                },
                {
                    "id": "3343813-3343814",
                    "name": "Creteil-L'Echat (Hopital Henri Mondor)",
                    "pos_x": "2.449433175686986",
                    "pos_y": "48.796740766583056"
                },
                {
                    "id": "3343815-3343816",
                    "name": "Creteil-Universite",
                    "pos_x": "2.450453177915302",
                    "pos_y": "48.78997831034893"
                },
                {
                    "id": "3343817-3343818",
                    "name": "Creteil-Prefecture (Hotel de Ville)",
                    "pos_x": "2.459368396259053",
                    "pos_y": "48.77990531695967"
                },
                {
                    "id": "3343819-3343825",
                    "name": "Pointe du Lac",
                    "pos_x": "2.464564993211323",
                    "pos_y": "48.768715125271434"
                }
            ]
        },
        {
            "line": "9",
            "color": "#D2D200",
            "id": "9",
            "stations": [
                {
                    "id": "1804-2343",
                    "name": "Pont de Sevres",
                    "pos_x": "2.230799591317221",
                    "pos_y": "48.82967484383875"
                },
                {
                    "id": "2088-2549",
                    "name": "Billancourt",
                    "pos_x": "2.238639348575401",
                    "pos_y": "48.832110560110216"
                },
                {
                    "id": "1884-2280",
                    "name": "Marcel Sembat",
                    "pos_x": "2.243840592379737",
                    "pos_y": "48.83370884910397"
                },
                {
                    "id": "1747-2425",
                    "name": "Porte de Saint-Cloud",
                    "pos_x": "2.257122229845438",
                    "pos_y": "48.83796121353705"
                },
                {
                    "id": "1936-2261",
                    "name": "Exelmans",
                    "pos_x": "2.260032902212424",
                    "pos_y": "48.84293869586254"
                },
                {
                    "id": "1816-2355",
                    "name": "Michel-Ange-Molitor",
                    "pos_x": "2.261745124963672",
                    "pos_y": "48.845058172313735"
                },
                {
                    "id": "1814-2353",
                    "name": "Michel-Ange-Auteuil",
                    "pos_x": "2.264082030746222",
                    "pos_y": "48.84789565020842"
                },
                {
                    "id": "1899-2295",
                    "name": "Jasmin",
                    "pos_x": "2.26817674943596",
                    "pos_y": "48.85250409061289"
                },
                {
                    "id": "1762-2440",
                    "name": "Ranelagh",
                    "pos_x": "2.270109138941893",
                    "pos_y": "48.855485050404425"
                },
                {
                    "id": "1917-2242",
                    "name": "La Muette",
                    "pos_x": "2.27415463108692",
                    "pos_y": "48.85804605629201"
                },
                {
                    "id": "1708-2453",
                    "name": "Rue de la Pompe (Avenue Georges Mandel)",
                    "pos_x": "2.278112558447475",
                    "pos_y": "48.86397444578292"
                },
                {
                    "id": "1637-2517",
                    "name": "Trocadero",
                    "pos_x": "2.286243170691258",
                    "pos_y": "48.86306502022607"
                },
                {
                    "id": "1895-2291",
                    "name": "Iena",
                    "pos_x": "2.294162018108232",
                    "pos_y": "48.864794065815566"
                },
                {
                    "id": "2043-2162",
                    "name": "Alma-Marceau",
                    "pos_x": "2.300991003495585",
                    "pos_y": "48.86476684497177"
                },
                {
                    "id": "1946-2201",
                    "name": "Franklin-Roosevelt",
                    "pos_x": "2.309505157337887",
                    "pos_y": "48.86869984735294"
                },
                {
                    "id": "1730-2441",
                    "name": "Saint-Philippe du Roule",
                    "pos_x": "2.310038344619937",
                    "pos_y": "48.87242238365101"
                },
                {
                    "id": "1819-2358",
                    "name": "Miromesnil",
                    "pos_x": "2.314606321619312",
                    "pos_y": "48.87370952773764"
                },
                {
                    "id": "1715-2460",
                    "name": "Saint-Augustin",
                    "pos_x": "2.321361928104079",
                    "pos_y": "48.87455838471093"
                },
                {
                    "id": "1890-2286",
                    "name": "Havre-Caumartin",
                    "pos_x": "2.327695409630174",
                    "pos_y": "48.87371340670774"
                },
                {
                    "id": "1972-2227",
                    "name": "Chaussee d'Antin (La Fayette)",
                    "pos_x": "2.333451218577799",
                    "pos_y": "48.87310927430917"
                },
                {
                    "id": "1702-2447",
                    "name": "Richelieu-Drouot",
                    "pos_x": "2.339115039269688",
                    "pos_y": "48.8721523525874"
                },
                {
                    "id": "1712-2457",
                    "name": "Grands Boulevards",
                    "pos_x": "2.343154773075233",
                    "pos_y": "48.87149773935003"
                },
                {
                    "id": "2001-2190",
                    "name": "Bonne Nouvelle",
                    "pos_x": "2.350497971863092",
                    "pos_y": "48.87016420090056"
                },
                {
                    "id": "1678-2488",
                    "name": "Strasbourg-Saint-Denis",
                    "pos_x": "2.354603790697162",
                    "pos_y": "48.8692241716524"
                },
                {
                    "id": "1647-2527",
                    "name": "Republique",
                    "pos_x": "2.363826143977408",
                    "pos_y": "48.86750342377884"
                },
                {
                    "id": "1844-2311",
                    "name": "Oberkampf",
                    "pos_x": "2.368410025658025",
                    "pos_y": "48.864657879612494"
                },
                {
                    "id": "1714-2459",
                    "name": "Saint-Ambroise",
                    "pos_x": "2.37473343128132",
                    "pos_y": "48.86101925991959"
                },
                {
                    "id": "1633-2513",
                    "name": "Voltaire (Leon Blum)",
                    "pos_x": "2.38071878585627",
                    "pos_y": "48.85745372268132"
                },
                {
                    "id": "2032-2151",
                    "name": "Charonne",
                    "pos_x": "2.385563480822886",
                    "pos_y": "48.85458049908102"
                },
                {
                    "id": "1709-2454",
                    "name": "Rue des Boulets",
                    "pos_x": "2.389378127918613",
                    "pos_y": "48.85231542739917"
                },
                {
                    "id": "1651-2531",
                    "name": "Nation",
                    "pos_x": "2.39506230542588",
                    "pos_y": "48.84847428597437"
                },
                {
                    "id": "2014-2133",
                    "name": "Buzenval",
                    "pos_x": "2.401022270517142",
                    "pos_y": "48.851812133001964"
                },
                {
                    "id": "1882-2278",
                    "name": "Maraichers",
                    "pos_x": "2.406089161879023",
                    "pos_y": "48.85272511927084"
                },
                {
                    "id": "1745-2423",
                    "name": "Porte de Montreuil",
                    "pos_x": "2.41062642573733",
                    "pos_y": "48.853543916083595"
                },
                {
                    "id": "1704-2449",
                    "name": "Robespierre",
                    "pos_x": "2.422983216145875",
                    "pos_y": "48.855726428633155"
                },
                {
                    "id": "1993-2183",
                    "name": "Croix-de-Chavaux (Jacques Duclos)",
                    "pos_x": "2.435555715694056",
                    "pos_y": "48.85796559116602"
                },
                {
                    "id": "1873-2269",
                    "name": "Mairie de Montreuil",
                    "pos_x": "2.441310941253409",
                    "pos_y": "48.861936914133"
                }
            ]
        },
        {
            "line": "10",
            "color": "#DC9600",
            "id": "10",
            "stations": [
                {
                    "id": "2005-2194",
                    "name": "Boulogne Pont de Saint-Cloud",
                    "pos_x": "2.228536981504942",
                    "pos_y": "48.840745015226894"
                },
                {
                    "id": "2004-2193",
                    "name": "Boulogne-Jean-Jaures",
                    "pos_x": "2.238887325790711",
                    "pos_y": "48.84200534728089"
                },
                {
                    "id": "8433-2346",
                    "name": "Porte d'Auteuil",
                    "pos_x": "2.257744680376012",
                    "pos_y": "48.84797154059771"
                },
                {
                    "id": "1817-",
                    "name": "Michel-Ange-Molitor",
                    "pos_x": "2.261745124963672",
                    "pos_y": "48.845058172313735"
                },
                {
                    "id": "2026-",
                    "name": "Chardon-Lagache",
                    "pos_x": "2.266441543081952",
                    "pos_y": "48.84520470358954"
                },
                {
                    "id": "1818-",
                    "name": "Mirabeau",
                    "pos_x": "2.272763753316159",
                    "pos_y": "48.847131008196236"
                },
                {
                    "id": "1903-2299",
                    "name": "Javel-Andre-Citroen",
                    "pos_x": "2.277711739827638",
                    "pos_y": "48.846123666874924"
                },
                {
                    "id": "2031-2150",
                    "name": "Charles Michels",
                    "pos_x": "2.285999223421597",
                    "pos_y": "48.84653463673933"
                },
                {
                    "id": "2057-2106",
                    "name": "Avenue Emile-Zola",
                    "pos_x": "2.295420478027581",
                    "pos_y": "48.84701958188098"
                },
                {
                    "id": "1916-2241",
                    "name": "La Motte-Picquet-Grenelle",
                    "pos_x": "2.298930911748061",
                    "pos_y": "48.84874166571782"
                },
                {
                    "id": "1661-2541",
                    "name": "Segur",
                    "pos_x": "2.307402240619641",
                    "pos_y": "48.84706613315245"
                },
                {
                    "id": "1927-2252",
                    "name": "Duroc",
                    "pos_x": "2.317005235737245",
                    "pos_y": "48.846989106139524"
                },
                {
                    "id": "1690-2500",
                    "name": "Vaneau",
                    "pos_x": "2.32125786290546",
                    "pos_y": "48.8488163724703"
                },
                {
                    "id": "1666-2476",
                    "name": "Sevres-Babylone",
                    "pos_x": "2.326488473969165",
                    "pos_y": "48.851192349321856"
                },
                {
                    "id": "1867-2334",
                    "name": "Mabillon",
                    "pos_x": "2.335502053090325",
                    "pos_y": "48.85301676792474"
                },
                {
                    "id": "1653-2533",
                    "name": "Odeon",
                    "pos_x": "2.339727781593096",
                    "pos_y": "48.85230076309423"
                },
                {
                    "id": "1977-2167",
                    "name": "Cluny-La Sorbonne",
                    "pos_x": "2.344273345421351",
                    "pos_y": "48.851050282314304"
                },
                {
                    "id": "1811-2350",
                    "name": "Maubert-Mutualite",
                    "pos_x": "2.348054290484543",
                    "pos_y": "48.85012732379643"
                },
                {
                    "id": "2018-2137",
                    "name": "Cardinal-Lemoine",
                    "pos_x": "2.351623256378513",
                    "pos_y": "48.84665685125004"
                },
                {
                    "id": "1908-2233",
                    "name": "Jussieu",
                    "pos_x": "2.35505026306104",
                    "pos_y": "48.845950666642075"
                },
                {
                    "id": "1952-2207",
                    "name": "Gare d'Austerlitz",
                    "pos_x": "2.365184812004335",
                    "pos_y": "48.84243679702547"
                },
                {
                    "id": "-2256",
                    "name": "Eglise d'Auteuil",
                    "pos_x": "2.269135872730268",
                    "pos_y": "48.84715005570977"
                },
                {
                    "id": "-2354",
                    "name": "Michel-Ange-Auteuil",
                    "pos_x": "2.264082030746222",
                    "pos_y": "48.84789565020842"
                }
            ]
        },
        {
            "line": "11",
            "color": "#6E491E",
            "id": "11",
            "stations": [
                {
                    "id": "1875-2271",
                    "name": "Mairie des Lilas",
                    "pos_x": "2.416479643671439",
                    "pos_y": "48.8797612539972"
                },
                {
                    "id": "1753-2431",
                    "name": "Porte des Lilas",
                    "pos_x": "2.406480156998486",
                    "pos_y": "48.87717481930547"
                },
                {
                    "id": "1682-2492",
                    "name": "Telegraphe",
                    "pos_x": "2.398867593898875",
                    "pos_y": "48.875474456665465"
                },
                {
                    "id": "1798-2408",
                    "name": "Place des Fetes",
                    "pos_x": "2.392983964817394",
                    "pos_y": "48.876949848110215"
                },
                {
                    "id": "1905-2266",
                    "name": "Jourdain",
                    "pos_x": "2.389415032035528",
                    "pos_y": "48.87511181695599"
                },
                {
                    "id": "1758-2436",
                    "name": "Pyrenees",
                    "pos_x": "2.385316215101792",
                    "pos_y": "48.87388185415816"
                },
                {
                    "id": "2066-2115",
                    "name": "Belleville",
                    "pos_x": "2.376702144728945",
                    "pos_y": "48.872310113783094"
                },
                {
                    "id": "1963-2218",
                    "name": "Goncourt (Hopital Saint-Louis)",
                    "pos_x": "2.371094839731201",
                    "pos_y": "48.86995751270301"
                },
                {
                    "id": "967988-967989",
                    "name": "Republique",
                    "pos_x": "2.363826143977408",
                    "pos_y": "48.86750342377884"
                },
                {
                    "id": "2051-2100",
                    "name": "Arts-et-Metiers",
                    "pos_x": "2.356729869173701",
                    "pos_y": "48.865322711678054"
                },
                {
                    "id": "1761-2439",
                    "name": "Rambuteau",
                    "pos_x": "2.353495740128163",
                    "pos_y": "48.861204990323024"
                },
                {
                    "id": "1893-2289",
                    "name": "Hotel de Ville",
                    "pos_x": "2.351577562994996",
                    "pos_y": "48.85747798252934"
                },
                {
                    "id": "1965-2220",
                    "name": "Chatelet",
                    "pos_x": "2.347305852747763",
                    "pos_y": "48.85879919807379"
                }
            ]
        },
        {
            "line": "12",
            "color": "#00643C",
            "id": "12",
            "stations": [
                {
                    "id": "1870-2337",
                    "name": "Mairie d'Issy",
                    "pos_x": "2.273041525142415",
                    "pos_y": "48.824105030688976"
                },
                {
                    "id": "1986-2176",
                    "name": "Corentin-Celton",
                    "pos_x": "2.279411682050421",
                    "pos_y": "48.82708544889643"
                },
                {
                    "id": "1750-2428",
                    "name": "Porte de Versailles",
                    "pos_x": "2.288022141100325",
                    "pos_y": "48.83244909914335"
                },
                {
                    "id": "1984-2174",
                    "name": "Convention",
                    "pos_x": "2.296630343233871",
                    "pos_y": "48.83730749458223"
                },
                {
                    "id": "1691-2501",
                    "name": "Vaugirard (Adolphe Cherioux)",
                    "pos_x": "2.301107514879988",
                    "pos_y": "48.83951658539453"
                },
                {
                    "id": "1632-2512",
                    "name": "Volontaires",
                    "pos_x": "2.307948679336751",
                    "pos_y": "48.84150552236795"
                },
                {
                    "id": "1782-2392",
                    "name": "Pasteur",
                    "pos_x": "2.312447513065986",
                    "pos_y": "48.84287127500633"
                },
                {
                    "id": "1938-2263",
                    "name": "Falguiere",
                    "pos_x": "2.317852783041332",
                    "pos_y": "48.84447014129586"
                },
                {
                    "id": "1826-2365",
                    "name": "Montparnasse-Bienvenue",
                    "pos_x": "2.324397012397453",
                    "pos_y": "48.84378130483655"
                },
                {
                    "id": "1842-2309",
                    "name": "Notre-Dame des Champs",
                    "pos_x": "2.328778026901662",
                    "pos_y": "48.84494263252667"
                },
                {
                    "id": "1646-2526",
                    "name": "Rennes",
                    "pos_x": "2.327782127147534",
                    "pos_y": "48.848457848541784"
                },
                {
                    "id": "1667-2477",
                    "name": "Sevres-Babylone",
                    "pos_x": "2.326488473969165",
                    "pos_y": "48.851192349321856"
                },
                {
                    "id": "1710-2455",
                    "name": "Rue du Bac",
                    "pos_x": "2.325712422170927",
                    "pos_y": "48.85555094016533"
                },
                {
                    "id": "1669-2479",
                    "name": "Solferino",
                    "pos_x": "2.323154855841107",
                    "pos_y": "48.85851112987378"
                },
                {
                    "id": "2052-2101",
                    "name": "Assemblee Nationale",
                    "pos_x": "2.320998191954085",
                    "pos_y": "48.860786963526714"
                },
                {
                    "id": "1982-2172",
                    "name": "Concorde",
                    "pos_x": "2.322943412243542",
                    "pos_y": "48.866285804583875"
                },
                {
                    "id": "1869-2336",
                    "name": "Madeleine",
                    "pos_x": "2.326272274027749",
                    "pos_y": "48.86963317302491"
                },
                {
                    "id": "1723-2468",
                    "name": "Saint-Lazare",
                    "pos_x": "2.324574810293918",
                    "pos_y": "48.87500639805501"
                },
                {
                    "id": "1686-2496",
                    "name": "Trinite-d'Estienne d'Orves",
                    "pos_x": "2.332543027297523",
                    "pos_y": "48.87631796226447"
                },
                {
                    "id": "1841-2308",
                    "name": "Notre-Dame de Lorette",
                    "pos_x": "2.337886489069273",
                    "pos_y": "48.87602621160853"
                },
                {
                    "id": "1720-2465",
                    "name": "Saint-Georges",
                    "pos_x": "2.337595082820351",
                    "pos_y": "48.87842525762863"
                },
                {
                    "id": "1792-2402",
                    "name": "Pigalle",
                    "pos_x": "2.337081682514974",
                    "pos_y": "48.882519385636314"
                },
                {
                    "id": "2037-2156",
                    "name": "Abbesses",
                    "pos_x": "2.337949777055663",
                    "pos_y": "48.88459420803534"
                },
                {
                    "id": "1920-2245",
                    "name": "Lamarck-Caulaincourt",
                    "pos_x": "2.338760649199277",
                    "pos_y": "48.88967407118814"
                },
                {
                    "id": "1906-2267",
                    "name": "Jules Joffrin",
                    "pos_x": "2.34465700412862",
                    "pos_y": "48.892439590482105"
                },
                {
                    "id": "1883-2279",
                    "name": "Marcadet-Poissonniers",
                    "pos_x": "2.349738407022142",
                    "pos_y": "48.89141683421295"
                },
                {
                    "id": "1886-2282",
                    "name": "Marx-Dormoy",
                    "pos_x": "2.359995766405675",
                    "pos_y": "48.89048545384733"
                },
                {
                    "id": "1743-2421",
                    "name": "Porte de la Chapelle",
                    "pos_x": "2.359507868815594",
                    "pos_y": "48.897245288093046"
                },
                {
                    "id": "3901291-3901292",
                    "name": "Front Populaire",
                    "pos_x": "2.365920319400959",
                    "pos_y": "48.90656714598029"
                }
            ]
        },
        {
            "line": "13",
            "color": "#82C8E6",
            "id": "13",
            "stations": [
                {
                    "id": "1969-2224",
                    "name": "Chatillon Montrouge",
                    "pos_x": "2.301678555458344",
                    "pos_y": "48.81074648857956"
                },
                {
                    "id": "1880-2276",
                    "name": "Malakoff-Rue Etienne Dolet",
                    "pos_x": "2.297077798334658",
                    "pos_y": "48.81530753120822"
                },
                {
                    "id": "1879-2275",
                    "name": "Malakoff-Plateau de Vanves",
                    "pos_x": "2.298464191970636",
                    "pos_y": "48.822583706837726"
                },
                {
                    "id": "1749-2427",
                    "name": "Porte de Vanves",
                    "pos_x": "2.305534669653895",
                    "pos_y": "48.82779554349536"
                },
                {
                    "id": "1799-2372",
                    "name": "Plaisance",
                    "pos_x": "2.314122323470855",
                    "pos_y": "48.8318256495863"
                },
                {
                    "id": "1787-2397",
                    "name": "Pernety",
                    "pos_x": "2.31807828549193",
                    "pos_y": "48.83393639265079"
                },
                {
                    "id": "1948-2203",
                    "name": "Gaite",
                    "pos_x": "2.322491749824627",
                    "pos_y": "48.83863164624487"
                },
                {
                    "id": "1827-2366",
                    "name": "Montparnasse-Bienvenue",
                    "pos_x": "2.324397012397453",
                    "pos_y": "48.84378130483655"
                },
                {
                    "id": "1928-2253",
                    "name": "Duroc",
                    "pos_x": "2.317005235737245",
                    "pos_y": "48.846989106139524"
                },
                {
                    "id": "1719-2464",
                    "name": "Saint-Francois-Xavier",
                    "pos_x": "2.314408121496151",
                    "pos_y": "48.85144170564173"
                },
                {
                    "id": "1638-2518",
                    "name": "Varenne",
                    "pos_x": "2.315056637317088",
                    "pos_y": "48.85687137924918"
                },
                {
                    "id": "1897-2293",
                    "name": "Invalides",
                    "pos_x": "2.313909577788542",
                    "pos_y": "48.862364704125895"
                },
                {
                    "id": "2025-2144",
                    "name": "Champs-Elysees-Clemenceau",
                    "pos_x": "2.313545549946741",
                    "pos_y": "48.86790534489709"
                },
                {
                    "id": "1820-2359",
                    "name": "Miromesnil",
                    "pos_x": "2.314606321619312",
                    "pos_y": "48.87370952773764"
                },
                {
                    "id": "1724-2469",
                    "name": "Saint-Lazare",
                    "pos_x": "2.324574810293918",
                    "pos_y": "48.87500639805501"
                },
                {
                    "id": "1858-2325",
                    "name": "Liege",
                    "pos_x": "2.327022200889503",
                    "pos_y": "48.879634760656806"
                },
                {
                    "id": "1796-2406",
                    "name": "Place de Clichy",
                    "pos_x": "2.327839556114741",
                    "pos_y": "48.88361499223493"
                },
                {
                    "id": "1656-2536",
                    "name": "La Fourche",
                    "pos_x": "2.325779674806892",
                    "pos_y": "48.88718394686578"
                },
                {
                    "id": "1888-2284",
                    "name": "Guy-Moquet",
                    "pos_x": "2.327428458503176",
                    "pos_y": "48.89282885338917"
                },
                {
                    "id": "1748-2426",
                    "name": "Porte de Saint-Ouen",
                    "pos_x": "2.328942812779894",
                    "pos_y": "48.89737479552952"
                },
                {
                    "id": "1959-2214",
                    "name": "Garibaldi",
                    "pos_x": "2.33183083796241",
                    "pos_y": "48.90609405024862"
                },
                {
                    "id": "1874-2270",
                    "name": "Mairie de Saint-Ouen",
                    "pos_x": "2.333924890479715",
                    "pos_y": "48.911964897880885"
                },
                {
                    "id": "1692060-1692061",
                    "name": "Carrefour-Pleyel",
                    "pos_x": "2.343305930512597",
                    "pos_y": "48.919573074058526"
                },
                {
                    "id": "1717-2462",
                    "name": "Saint-Denis - Porte de Paris",
                    "pos_x": "2.356035794172797",
                    "pos_y": "48.92993588967869"
                },
                {
                    "id": "1716-2461",
                    "name": "Basilique de Saint-Denis",
                    "pos_x": "2.359398261032672",
                    "pos_y": "48.93652685258673"
                },
                {
                    "id": "140078-140079",
                    "name": "Saint-Denis-Universite",
                    "pos_x": "2.364541763486513",
                    "pos_y": "48.945845657765744"
                },
                {
                    "id": "2009-2165",
                    "name": "Brochant",
                    "pos_x": "2.320174755787804",
                    "pos_y": "48.89058718660406"
                },
                {
                    "id": "1741-2419",
                    "name": "Porte de Clichy",
                    "pos_x": "2.313772158769625",
                    "pos_y": "48.89425226224654"
                },
                {
                    "id": "1872-2268",
                    "name": "Mairie de Clichy",
                    "pos_x": "2.305924149869319",
                    "pos_y": "48.903330094573725"
                },
                {
                    "id": "1947-2202",
                    "name": "Gabriel-Peri",
                    "pos_x": "2.294685111702555",
                    "pos_y": "48.9163823099221"
                },
                {
                    "id": "1662795-1662796",
                    "name": "Les Agnettes",
                    "pos_x": "2.286279577529783",
                    "pos_y": "48.92310377966602"
                },
                {
                    "id": "1662797-1662798",
                    "name": "Asnieres-Gennevilliers Les Courtilles",
                    "pos_x": "2.284174448283296",
                    "pos_y": "48.93075700333628"
                }
            ]
        },
        {
            "line": "14",
            "color": "#640082",
            "id": "14",
            "stations": [
                {
                    "id": "1166840-1166841",
                    "name": "Saint-Lazare",
                    "pos_x": "2.324574810293918",
                    "pos_y": "48.87500639805501"
                },
                {
                    "id": "1166838-1166839",
                    "name": "Madeleine",
                    "pos_x": "2.326272274027749",
                    "pos_y": "48.86963317302491"
                },
                {
                    "id": "6129304-6129305",
                    "name": "Pyramides",
                    "pos_x": "2.33418954196825",
                    "pos_y": "48.86590673959416"
                },
                {
                    "id": "1166834-1166835",
                    "name": "Chatelet",
                    "pos_x": "2.347305852747763",
                    "pos_y": "48.85879919807379"
                },
                {
                    "id": "1166832-1166833",
                    "name": "Gare de Lyon",
                    "pos_x": "2.373014219940096",
                    "pos_y": "48.84398558201753"
                },
                {
                    "id": "1166830-1166831",
                    "name": "Bercy",
                    "pos_x": "2.379554011203435",
                    "pos_y": "48.840001389548114"
                },
                {
                    "id": "1166828-1166829",
                    "name": "Cour Saint-Emilion",
                    "pos_x": "2.386632402066985",
                    "pos_y": "48.83333855925167"
                },
                {
                    "id": "1166826-1166827",
                    "name": "Bibliotheque-Francois Mitterrand",
                    "pos_x": "2.375748144341913",
                    "pos_y": "48.829990281683564"
                },
                {
                    "id": "1166824-1166825",
                    "name": "Olympiades",
                    "pos_x": "2.368032647756258",
                    "pos_y": "48.82727083603918"
                }
            ]
        }
    ]}

    return static_data
    
}

function getRERstaticData() {

    var static_data = { "lines": [
        { 
            "line": "A",
            "color": "#FF1400",
            "id": "77",
            "stations": [
                {
                    "id": "1670-2480",
                    "name": "Saint-Germain-en-Laye",
                    "pos_x": "2.094836628297753",
                    "pos_y": "48.89807641113002"
                }, 
                {
                    "id": "1851-2318",
                    "name": "Le Vesinet-Le Pecq",
                    "pos_x": "2.122117447472966",
                    "pos_y": "48.89797344633643"
                }, 
                {
                    "id": "1850-2317",
                    "name": "Le Vesinet-Centre",
                    "pos_x": "2.134600875228717",
                    "pos_y": "48.89008623555385"
                }, 
                {
                    "id": "1970-2225",
                    "name": "Chatou-Croissy",
                    "pos_x": "2.155903471896523",
                    "pos_y": "48.88521121820845"
                }, 
                {
                    "id": "1713-2458",
                    "name": "Rueil-Malmaison",
                    "pos_x": "2.172579449082059",
                    "pos_y": "48.887573618648176"
                }, 
                {
                    "id": "1831-2370",
                    "name": "Nanterre-Ville",
                    "pos_x": "2.195363986912902",
                    "pos_y": "48.89512589133458"
                }, 
                {
                    "id": "1830-2369",
                    "name": "Nanterre-Universite",
                    "pos_x": "2.215232347269524",
                    "pos_y": "48.9015496742534"
                }, 
                {
                    "id": "48429-48430",
                    "name": "Cergy-Le-Haut",
                    "pos_x": "2.010999760003633",
                    "pos_y": "49.047876203368986"
                }, 
                {
                    "id": "2022-2141",
                    "name": "Cergy-Saint-Christophe",
                    "pos_x": "2.034294460484787",
                    "pos_y": "49.049647005245355"
                }, 
                {
                    "id": "2021-2140",
                    "name": "Cergy-Prefecture",
                    "pos_x": "2.079534939997374",
                    "pos_y": "49.03646398072535"
                }, 
                {
                    "id": "48433-48434",
                    "name": "Neuville-Universite",
                    "pos_x": "2.078306591409993",
                    "pos_y": "49.014133684983044"
                }, 
                {
                    "id": "1983-2173",
                    "name": "Conflans-Fin d'Oise",
                    "pos_x": "2.073769886475506",
                    "pos_y": "48.99101254867934"
                }, 
                {
                    "id": "2039-2158",
                    "name": "Acheres-Ville",
                    "pos_x": "2.077731765931404",
                    "pos_y": "48.97066504833311"
                }, 
                {
                    "id": "1801-2340",
                    "name": "Poissy",
                    "pos_x": "2.041072289675926",
                    "pos_y": "48.93326540612854"
                }, 
                {
                    "id": "2776542-2771311",
                    "name": "Acheres Grand Cormier",
                    "pos_x": "2.093521902945918",
                    "pos_y": "48.95540224454144"
                }, 
                {
                    "id": "1878-2274",
                    "name": "Maisons-Laffitte",
                    "pos_x": "2.144558756800802",
                    "pos_y": "48.945795934518046"
                }, 
                {
                    "id": "1643-2523",
                    "name": "Sartrouville",
                    "pos_x": "2.157086497849344",
                    "pos_y": "48.937736062525"
                }, 
                {
                    "id": "1894-2290",
                    "name": "Houilles Carrieres-sur-Seine",
                    "pos_x": "2.185353376288786",
                    "pos_y": "48.920379374823604"
                }, 
                {
                    "id": "1829-2368",
                    "name": "Nanterre-Prefecture",
                    "pos_x": "2.223212967029377",
                    "pos_y": "48.89574531209786"
                }, 
                {
                    "id": "1913-2238",
                    "name": "La Defense (Grande Arche)",
                    "pos_x": "2.237018056395014",
                    "pos_y": "48.8921870764495"
                }, 
                {
                    "id": "2084-2545",
                    "name": "Charles de Gaulle-Etoile",
                    "pos_x": "2.294490592832005",
                    "pos_y": "48.874238476656075"
                }, 
                {
                    "id": "2053-2102",
                    "name": "Auber",
                    "pos_x": "2.329927170608276",
                    "pos_y": "48.87215749487708"
                }, 
                {
                    "id": "1967-2222",
                    "name": "Chatelet-Les Halles",
                    "pos_x": "2.347012687216214",
                    "pos_y": "48.86182227459668"
                }, 
                {
                    "id": "1956-2211",
                    "name": "Gare de Lyon",
                    "pos_x": "2.373259976710645",
                    "pos_y": "48.84413934985302"
                }, 
                {
                    "id": "1835-2302",
                    "name": "Nation",
                    "pos_x": "2.395823588826127",
                    "pos_y": "48.84823711041019"
                }, 
                {
                    "id": "1631-2511",
                    "name": "Vincennes",
                    "pos_x": "2.433299717644525",
                    "pos_y": "48.847308359451276"
                }, 
                {
                    "id": "1689-2499",
                    "name": "Val de Fontenay",
                    "pos_x": "2.488187575181283",
                    "pos_y": "48.85379557653647"
                }, 
                {
                    "id": "1837-2304",
                    "name": "Neuilly-Plaisance",
                    "pos_x": "2.513825291026663",
                    "pos_y": "48.853485712976834"
                }, 
                {
                    "id": "2010-2129",
                    "name": "Bry-sur-Marne",
                    "pos_x": "2.525922546568198",
                    "pos_y": "48.84490113871274"
                }, 
                {
                    "id": "1652-2532",
                    "name": "Noisy-le-Grand (Mont d'Est)",
                    "pos_x": "2.547775189299494",
                    "pos_y": "48.84084343185482"
                }, 
                {
                    "id": "1840-2307",
                    "name": "Noisy-Champs",
                    "pos_x": "2.580085911974356",
                    "pos_y": "48.8428848408236"
                }, 
                {
                    "id": "1839-2306",
                    "name": "Noisiel",
                    "pos_x": "2.615952488501647",
                    "pos_y": "48.84349164874607"
                }, 
                {
                    "id": "1859-2326",
                    "name": "Lognes",
                    "pos_x": "2.633210913417633",
                    "pos_y": "48.83921929995164"
                }, 
                {
                    "id": "1636-2516",
                    "name": "Torcy",
                    "pos_x": "2.655130086641314",
                    "pos_y": "48.83964551726302"
                }, 
                {
                    "id": "2012-2131",
                    "name": "Bussy-Saint-Georges",
                    "pos_x": "2.708981742262277",
                    "pos_y": "48.83653643294522"
                }, 
                {
                    "id": "161468-161469",
                    "name": "Val d'europe",
                    "pos_x": "2.77343391788355",
                    "pos_y": "48.855394809031935"
                }, 
                {
                    "id": "1885-2281",
                    "name": "Marne-la-Vallee Chessy",
                    "pos_x": "2.782226723449037",
                    "pos_y": "48.86995013493981"
                }, 
                {
                    "id": "1943-2198",
                    "name": "Fontenay-sous-Bois",
                    "pos_x": "2.463708038038903",
                    "pos_y": "48.84372026160052"
                }, 
                {
                    "id": "1838-2305",
                    "name": "Nogent-sur-Marne",
                    "pos_x": "2.471681241208739",
                    "pos_y": "48.83428889889013"
                }, 
                {
                    "id": "1904-2300",
                    "name": "Joinville-le-Pont",
                    "pos_x": "2.463856795362316",
                    "pos_y": "48.82103881506317"
                }, 
                {
                    "id": "1671-2481",
                    "name": "Saint-Maur Creteil",
                    "pos_x": "2.472720403802171",
                    "pos_y": "48.80620002476371"
                }, 
                {
                    "id": "1848-2315",
                    "name": "Le Parc de Saint-Maur",
                    "pos_x": "2.486349748779074",
                    "pos_y": "48.80537766216148"
                }, 
                {
                    "id": "2024-2143",
                    "name": "Champigny",
                    "pos_x": "2.510307237115641",
                    "pos_y": "48.80698507164624"
                }, 
                {
                    "id": "1919-2244",
                    "name": "La Varenne-Chennevieres",
                    "pos_x": "2.513423299545896",
                    "pos_y": "48.79538383562037"
                }, 
                {
                    "id": "1680-2490",
                    "name": "Sucy Bonneuil",
                    "pos_x": "2.507482645722801",
                    "pos_y": "48.771707906064925"
                }, 
                {
                    "id": "2074-2123",
                    "name": "Boissy-Saint-Leger",
                    "pos_x": "2.504559838317235",
                    "pos_y": "48.752185723486896"
                }
        ]
        },
        {
            "line": "D",
            "color": "#32A946",
            "id": "80841",
            "stations": [
                {
                    "id": "1662660-1662661",
                    "name": "Gare de Lyon",
                    "pos_x": "2.373259976710645",
                    "pos_y": "48.84413934985302"
                }, 
                {
                    "id": "1662662-1662663",
                    "name": "Maisons-Alfort Alfortville",
                    "pos_x": "2.426482408484048",
                    "pos_y": "48.80204938032392"
                }, 
                {
                    "id": "1662664-1662665",
                    "name": "Le Vert de Maisons",
                    "pos_x": "2.432070117953792",
                    "pos_y": "48.78891489669564"
                }, 
                {
                    "id": "4473206-",
                    "name": "Creteil-Pompadour",
                    "pos_x": "2.435306339706323",
                    "pos_y": "48.771266038121055"
                }, 
                {
                    "id": "1662668-1662669",
                    "name": "Villeneuve-Triage",
                    "pos_x": "2.438344239163614",
                    "pos_y": "48.745230819408114"
                }, 
                {
                    "id": "1662670-1662671",
                    "name": "Villeneuve-Saint-Georges",
                    "pos_x": "2.446135830934545",
                    "pos_y": "48.73011683142026"
                }, 
                {
                    "id": "1662672-1662673",
                    "name": "Vigneux-sur-Seine",
                    "pos_x": "2.414358879800508",
                    "pos_y": "48.7083664325953"
                }, 
                {
                    "id": "1662674-1662675",
                    "name": "Juvisy-sur-Orge",
                    "pos_x": "2.382757203082266",
                    "pos_y": "48.68969793365298"
                }, 
                {
                    "id": "1662676-1662677",
                    "name": "Viry-Chatillon",
                    "pos_x": "2.386783797033431",
                    "pos_y": "48.676092433958715"
                }, 
                {
                    "id": "1662678-1662679",
                    "name": "Grigny-Centre",
                    "pos_x": "2.396176812439178",
                    "pos_y": "48.65396975928158"
                }, 
                {
                    "id": "1662680-1662681",
                    "name": "Orangis Bois de l'Epine",
                    "pos_x": "2.407796287520861",
                    "pos_y": "48.63635136800817"
                }, 
                {
                    "id": "1662682-1662683",
                    "name": "Evry Courcouronnes",
                    "pos_x": "2.428738987347718",
                    "pos_y": "48.62602242806499"
                }, 
                {
                    "id": "1662684-1662685",
                    "name": "Le Bras-de-Fer",
                    "pos_x": "2.451409095593275",
                    "pos_y": "48.62333224107223"
                }, 
                {
                    "id": "1662686-1662687",
                    "name": "Corbeil-Essonnes",
                    "pos_x": "2.472933649102297",
                    "pos_y": "48.61342791358873"
                }, 
                {
                    "id": "-4473207",
                    "name": "Creteil-Pompadour",
                    "pos_x": "2.435306339706323",
                    "pos_y": "48.771266038121055"
                }
        ]
        }, 
        {
            "line": "D",
            "color": "#32A946",
            "id": "213760",
            "stations": [
                {
                    "id": "4102152-4102153",
                    "name": "Stade de France-Saint-Denis",
                    "pos_x": "2.350389537900993",
                    "pos_y": "48.917567175685384"
                }, 
                {
                    "id": "4102154-4102155",
                    "name": "Paris-Nord",
                    "pos_x": "2.357115334947971",
                    "pos_y": "48.88076895833307"
                }, 
                {
                    "id": "4102156-4102157",
                    "name": "Chatelet-Les Halles",
                    "pos_x": "2.347012687216214",
                    "pos_y": "48.86182227459668"
                }, 
                {
                    "id": "4102184-4102185",
                    "name": "Gare de Lyon (Banlieue)",
                    "pos_x": "2.373916471169029",
                    "pos_y": "48.8437725768586"
                }, 
                {
                    "id": "4102160-4102161",
                    "name": "Maisons-Alfort Alfortville",
                    "pos_x": "2.426482408484048",
                    "pos_y": "48.80204938032392"
                }, 
                {
                    "id": "4102162-4102163",
                    "name": "Villeneuve-Saint-Georges",
                    "pos_x": "2.446135830934545",
                    "pos_y": "48.73011683142026"
                }, 
                {
                    "id": "4102164-4102165",
                    "name": "Montgeron Crosne",
                    "pos_x": "2.4622822460488",
                    "pos_y": "48.70823782858778"
                }, 
                {
                    "id": "4102166-4102167",
                    "name": "Yerres",
                    "pos_x": "2.484245146583624",
                    "pos_y": "48.70661094689584"
                }, 
                {
                    "id": "4102168-4102169",
                    "name": "Brunoy",
                    "pos_x": "2.506078154570987",
                    "pos_y": "48.69973243301001"
                }, 
                {
                    "id": "4102170-4102171",
                    "name": "Boussy-Saint-Antoine",
                    "pos_x": "2.533130656571037",
                    "pos_y": "48.681016616342724"
                }, 
                {
                    "id": "4102172-4102173",
                    "name": "Combs-la-Ville Quincy",
                    "pos_x": "2.547548045814366",
                    "pos_y": "48.66790196104987"
                }, 
                {
                    "id": "4102174-4102175",
                    "name": "Lieusaint Moissy",
                    "pos_x": "2.569583548243857",
                    "pos_y": "48.62837555082435"
                }, 
                {
                    "id": "4102176-4102177",
                    "name": "Savigny-le-Temple Nandy",
                    "pos_x": "2.58394771106125",
                    "pos_y": "48.595563837991776"
                }, 
                {
                    "id": "4102178-4102179",
                    "name": "Cesson",
                    "pos_x": "2.594551816007613",
                    "pos_y": "48.564949495670916"
                }, 
                {
                    "id": "4102180-4102181",
                    "name": "Le Mee",
                    "pos_x": "2.625522155066302",
                    "pos_y": "48.538775256627815"
                }, 
                {
                    "id": "4102182-4102183",
                    "name": "Melun",
                    "pos_x": "2.654990284856376",
                    "pos_y": "48.52724332056844"
                }]
        }, 
        {
            "line": "C",
            "color": "#F9D600",
            "id": "1033",
            "stations": [
                {
                    "id": "2855448-2855449",
                    "name": "Gare d'Austerlitz Grandes Lignes",
                    "pos_x": "2.365433384726205",
                    "pos_y": "48.842528026791484"
                }, 
                {
                    "id": "46492-47004",
                    "name": "Versailles Chateau-Rive Gauche",
                    "pos_x": "2.129043868731507",
                    "pos_y": "48.800215578145895"
                }, 
                {
                    "id": "46331-46843",
                    "name": "Porchefontaine",
                    "pos_x": "2.152378660238759",
                    "pos_y": "48.796528182075015"
                }, 
                {
                    "id": "46332-46844",
                    "name": "Viroflay-Rive Gauche",
                    "pos_x": "2.171389812756379",
                    "pos_y": "48.80071846386355"
                }, 
                {
                    "id": "46333-46845",
                    "name": "Chaville-Velizy",
                    "pos_x": "2.183684109854236",
                    "pos_y": "48.79972882534396"
                }, 
                {
                    "id": "46446-46958",
                    "name": "Meudon-Val-Fleury",
                    "pos_x": "2.240883067974086",
                    "pos_y": "48.807492625771474"
                }, 
                {
                    "id": "46334-46846",
                    "name": "Issy",
                    "pos_x": "2.258759767033708",
                    "pos_y": "48.81967448818826"
                }, 
                {
                    "id": "46335-46847",
                    "name": "Issy-Val de Seine",
                    "pos_x": "2.263689648738453",
                    "pos_y": "48.83011963925857"
                }, 
                {
                    "id": "46336-46848",
                    "name": "Pont du Garigliano-Hopital Europeen G.Pompidou",
                    "pos_x": "2.270458243787242",
                    "pos_y": "48.83908975542995"
                }, 
                {
                    "id": "46337-46849",
                    "name": "Javel",
                    "pos_x": "2.276760967379574",
                    "pos_y": "48.84619214048855"
                }, 
                {
                    "id": "46338-46850",
                    "name": "Champ de Mars-Tour Eiffel",
                    "pos_x": "2.290391553460649",
                    "pos_y": "48.857293413870465"
                }, 
                {
                    "id": "46536-47048",
                    "name": "Pont de l'alma",
                    "pos_x": "2.300989969386769",
                    "pos_y": "48.86266245169434"
                }, 
                {
                    "id": "46339-46851",
                    "name": "Invalides",
                    "pos_x": "2.313911078538979",
                    "pos_y": "48.86290189176217"
                }, 
                {
                    "id": "46340-46852",
                    "name": "Musee d'Orsay",
                    "pos_x": "2.325620298752375",
                    "pos_y": "48.860708229865644"
                }, 
                {
                    "id": "46493-47005",
                    "name": "Saint-Michel Notre-Dame",
                    "pos_x": "2.346034984443716",
                    "pos_y": "48.85333579648197"
                }, 
                {
                    "id": "46341-46853",
                    "name": "Gare d'Austerlitz",
                    "pos_x": "2.365433384726205",
                    "pos_y": "48.842528026791484"
                }, 
                {
                    "id": "142869-142870",
                    "name": "Bibliotheque-Francois Mitterrand",
                    "pos_x": "2.376695892136014",
                    "pos_y": "48.82987504370409"
                }, 
                {
                    "id": "142871-142872",
                    "name": "Ivry-sur-Seine",
                    "pos_x": "2.391686971662538",
                    "pos_y": "48.813989052009454"
                }, 
                {
                    "id": "142873-142874",
                    "name": "Vitry-sur-Seine",
                    "pos_x": "2.402712818542927",
                    "pos_y": "48.800209398351384"
                }, 
                {
                    "id": "142875-142876",
                    "name": "Les Ardoines",
                    "pos_x": "2.409541655099439",
                    "pos_y": "48.7825054354935"
                }, 
                {
                    "id": "46454-46966",
                    "name": "Choisy-le-Roi",
                    "pos_x": "2.411386724936104",
                    "pos_y": "48.76378680955171"
                }, 
                {
                    "id": "46342-46854",
                    "name": "Villeneuve-le-Roi",
                    "pos_x": "2.426399820474823",
                    "pos_y": "48.739830699436546"
                }, 
                {
                    "id": "46343-46855",
                    "name": "Ablon",
                    "pos_x": "2.419565024377941",
                    "pos_y": "48.72553530576058"
                }, 
                {
                    "id": "46344-46856",
                    "name": "Athis-Mons",
                    "pos_x": "2.403633104908493",
                    "pos_y": "48.71262898747625"
                }, 
                {
                    "id": "46345-46857",
                    "name": "Juvisy-sur-Orge",
                    "pos_x": "2.382757203082266",
                    "pos_y": "48.68969793365298"
                }, 
                {
                    "id": "46346-46858",
                    "name": "Savigny-sur-Orge",
                    "pos_x": "2.352481401048998",
                    "pos_y": "48.676446656997726"
                }, 
                {
                    "id": "46518-47030",
                    "name": "Petit-Vaux",
                    "pos_x": "2.333249458502209",
                    "pos_y": "48.67638132528039"
                }, 
                {
                    "id": "46347-46859",
                    "name": "Gravigny-Balizy",
                    "pos_x": "2.317626404971018",
                    "pos_y": "48.685713626380426"
                }, 
                {
                    "id": "46348-46860",
                    "name": "Chilly-Mazarin",
                    "pos_x": "2.307841187338625",
                    "pos_y": "48.700680803702134"
                }, 
                {
                    "id": "46349-46861",
                    "name": "Longjumeau",
                    "pos_x": "2.294557749213463",
                    "pos_y": "48.70223938691144"
                }, 
                {
                    "id": "46350-46862",
                    "name": "Massy-Palaiseau",
                    "pos_x": "2.257355188147784",
                    "pos_y": "48.725197641013786"
                }, 
                {
                    "id": "65831-65832",
                    "name": "Igny",
                    "pos_x": "2.230961125063006",
                    "pos_y": "48.74018152105127"
                }, 
                {
                    "id": "65833-65834",
                    "name": "Bievres",
                    "pos_x": "2.215860860098732",
                    "pos_y": "48.7510232733389"
                }, 
                {
                    "id": "65835-65836",
                    "name": "Vauboyen",
                    "pos_x": "2.192135812662606",
                    "pos_y": "48.75918898322001"
                }, 
                {
                    "id": "65837-65838",
                    "name": "Jouy-en-Josas",
                    "pos_x": "2.163947085881832",
                    "pos_y": "48.764776012952915"
                }, 
                {
                    "id": "65839-65840",
                    "name": "Petit-Jouy-les-Loges",
                    "pos_x": "2.146831644765371",
                    "pos_y": "48.770425202105436"
                }, 
                {
                    "id": "65841-65842",
                    "name": "Versailles-Chantiers",
                    "pos_x": "2.136050488302483",
                    "pos_y": "48.795280246262216"
                }]
        }, 
        {
            "line": "C",
            "color": "#F9D600",
            "id": "355743",
            "stations": [
                {
                    "id": "6591391-6591392",
                    "name": "Juvisy-sur-Orge",
                    "pos_x": "2.382757203082266",
                    "pos_y": "48.68969793365298"
                }, 
                {
                    "id": "6591393-6591394",
                    "name": "Athis-Mons",
                    "pos_x": "2.403633104908493",
                    "pos_y": "48.71262898747625"
                }, 
                {
                    "id": "6591395-6591396",
                    "name": "Ablon",
                    "pos_x": "2.419565024377941",
                    "pos_y": "48.72553530576058"
                }, 
                {
                    "id": "6591397-6591398",
                    "name": "Villeneuve-le-Roi",
                    "pos_x": "2.426399820474823",
                    "pos_y": "48.739830699436546"
                }, 
                {
                    "id": "6591399-6591400",
                    "name": "Choisy-le-Roi",
                    "pos_x": "2.411386724936104",
                    "pos_y": "48.76378680955171"
                }, 
                {
                    "id": "6591401-6591402",
                    "name": "Bibliotheque-Francois Mitterrand",
                    "pos_x": "2.376695892136014",
                    "pos_y": "48.82987504370409"
                }, 
                {
                    "id": "6591403-6591404",
                    "name": "Gare d'Austerlitz",
                    "pos_x": "2.365433384726205",
                    "pos_y": "48.842528026791484"
                }, 
                {
                    "id": "6591405-6591406",
                    "name": "Saint-Michel Notre-Dame",
                    "pos_x": "2.346034984443716",
                    "pos_y": "48.85333579648197"
                }, 
                {
                    "id": "6591407-6591408",
                    "name": "Musee d'Orsay",
                    "pos_x": "2.325620298752375",
                    "pos_y": "48.860708229865644"
                }, 
                {
                    "id": "6591409-6591410",
                    "name": "Invalides",
                    "pos_x": "2.313911078538979",
                    "pos_y": "48.86290189176217"
                }, 
                {
                    "id": "6591411-6591412",
                    "name": "Pont de l'alma",
                    "pos_x": "2.300989969386769",
                    "pos_y": "48.86266245169434"
                }, 
                {
                    "id": "6591413-6591414",
                    "name": "Champ de Mars-Tour Eiffel",
                    "pos_x": "2.290391553460649",
                    "pos_y": "48.857293413870465"
                }, 
                {
                    "id": "6591415-6591416",
                    "name": "Javel",
                    "pos_x": "2.276760967379574",
                    "pos_y": "48.84619214048855"
                }, 
                {
                    "id": "6591417-6591418",
                    "name": "Issy-Val de Seine",
                    "pos_x": "2.263689648738453",
                    "pos_y": "48.83011963925857"
                }, 
                {
                    "id": "6591419-6591420",
                    "name": "Issy",
                    "pos_x": "2.258759767033708",
                    "pos_y": "48.81967448818826"
                }, 
                {
                    "id": "6591421-6591422",
                    "name": "Meudon-Val-Fleury",
                    "pos_x": "2.240883067974086",
                    "pos_y": "48.807492625771474"
                }, 
                {
                    "id": "6591423-6591424",
                    "name": "Chaville-Velizy",
                    "pos_x": "2.183684109854236",
                    "pos_y": "48.79972882534396"
                }, 
                {
                    "id": "6591425-6591426",
                    "name": "Viroflay-Rive Gauche",
                    "pos_x": "2.171389812756379",
                    "pos_y": "48.80071846386355"
                }, 
                {
                    "id": "6591427-6591428",
                    "name": "Porchefontaine",
                    "pos_x": "2.152378660238759",
                    "pos_y": "48.796528182075015"
                }, 
                {
                    "id": "6591429-6591430",
                    "name": "Versailles-Chantiers",
                    "pos_x": "2.136050488302483",
                    "pos_y": "48.795280246262216"
                }]
        }, 
        {
            "line": "C",
            "color": "#F9D600",
            "id": "1028",
            "stations": [
                {
                    "id": "7051152-7051153",
                    "name": "Versailles Chateau-Rive Gauche",
                    "pos_x": "2.129043868731507",
                    "pos_y": "48.800215578145895"
                }, 
                {
                    "id": "7051154-7051155",
                    "name": "Porchefontaine",
                    "pos_x": "2.152378660238759",
                    "pos_y": "48.796528182075015"
                }, 
                {
                    "id": "46217-46729",
                    "name": "Saint-Quentin-en-Yvelines",
                    "pos_x": "2.044621987173176",
                    "pos_y": "48.787390238280715"
                }, 
                {
                    "id": "46218-46730",
                    "name": "Saint-Cyr",
                    "pos_x": "2.071847005929401",
                    "pos_y": "48.79870763528835"
                }, 
                {
                    "id": "46219-46731",
                    "name": "Versailles-Chantiers",
                    "pos_x": "2.136050488302483",
                    "pos_y": "48.795280246262216"
                }, 
                {
                    "id": "46479-46991",
                    "name": "Viroflay-Rive Gauche",
                    "pos_x": "2.171389812756379",
                    "pos_y": "48.80071846386355"
                }, 
                {
                    "id": "46220-46732",
                    "name": "Chaville-Velizy",
                    "pos_x": "2.183684109854236",
                    "pos_y": "48.79972882534396"
                }, 
                {
                    "id": "46529-47041",
                    "name": "Meudon-Val-Fleury",
                    "pos_x": "2.240883067974086",
                    "pos_y": "48.807492625771474"
                }, 
                {
                    "id": "46221-46733",
                    "name": "Issy",
                    "pos_x": "2.258759767033708",
                    "pos_y": "48.81967448818826"
                }, 
                {
                    "id": "46222-46734",
                    "name": "Issy-Val de Seine",
                    "pos_x": "2.263689648738453",
                    "pos_y": "48.83011963925857"
                }, 
                {
                    "id": "46438-46950",
                    "name": "Pont du Garigliano-Hopital Europeen G.Pompidou",
                    "pos_x": "2.270458243787242",
                    "pos_y": "48.83908975542995"
                }, 
                {
                    "id": "46223-46735",
                    "name": "Javel",
                    "pos_x": "2.276760967379574",
                    "pos_y": "48.84619214048855"
                }, 
                {
                    "id": "46224-46736",
                    "name": "Champ de Mars-Tour Eiffel",
                    "pos_x": "2.290391553460649",
                    "pos_y": "48.857293413870465"
                }, 
                {
                    "id": "46225-46737",
                    "name": "Pont de l'alma",
                    "pos_x": "2.300989969386769",
                    "pos_y": "48.86266245169434"
                }, 
                {
                    "id": "46226-46738",
                    "name": "Invalides",
                    "pos_x": "2.313911078538979",
                    "pos_y": "48.86290189176217"
                }, 
                {
                    "id": "46227-46739",
                    "name": "Musee d'Orsay",
                    "pos_x": "2.325620298752375",
                    "pos_y": "48.860708229865644"
                }, 
                {
                    "id": "46228-46740",
                    "name": "Saint-Michel Notre-Dame",
                    "pos_x": "2.346034984443716",
                    "pos_y": "48.85333579648197"
                }, 
                {
                    "id": "46480-46992",
                    "name": "Gare d'Austerlitz",
                    "pos_x": "2.365433384726205",
                    "pos_y": "48.842528026791484"
                }, 
                {
                    "id": "46229-46741",
                    "name": "Bibliotheque-Francois Mitterrand",
                    "pos_x": "2.376695892136014",
                    "pos_y": "48.82987504370409"
                }, 
                {
                    "id": "46230-46742",
                    "name": "Ivry-sur-Seine",
                    "pos_x": "2.391686971662538",
                    "pos_y": "48.813989052009454"
                }, 
                {
                    "id": "46231-46743",
                    "name": "Vitry-sur-Seine",
                    "pos_x": "2.402712818542927",
                    "pos_y": "48.800209398351384"
                }, 
                {
                    "id": "46232-46744",
                    "name": "Les Ardoines",
                    "pos_x": "2.409541655099439",
                    "pos_y": "48.7825054354935"
                }, 
                {
                    "id": "46439-46951",
                    "name": "Choisy-le-Roi",
                    "pos_x": "2.411386724936104",
                    "pos_y": "48.76378680955171"
                }, 
                {
                    "id": "46233-46745",
                    "name": "Villeneuve-le-Roi",
                    "pos_x": "2.426399820474823",
                    "pos_y": "48.739830699436546"
                }, 
                {
                    "id": "46234-46746",
                    "name": "Ablon",
                    "pos_x": "2.419565024377941",
                    "pos_y": "48.72553530576058"
                }, 
                {
                    "id": "46235-46747",
                    "name": "Athis-Mons",
                    "pos_x": "2.403633104908493",
                    "pos_y": "48.71262898747625"
                }, 
                {
                    "id": "46236-46748",
                    "name": "Juvisy-sur-Orge",
                    "pos_x": "2.382757203082266",
                    "pos_y": "48.68969793365298"
                }, 
                {
                    "id": "46530-47042",
                    "name": "Savigny-sur-Orge",
                    "pos_x": "2.352481401048998",
                    "pos_y": "48.676446656997726"
                }, 
                {
                    "id": "46237-46749",
                    "name": "Epinay-sur-Orge",
                    "pos_x": "2.332622929198995",
                    "pos_y": "48.669483726107565"
                }, 
                {
                    "id": "46481-46993",
                    "name": "Sainte-Genevieve-des-Bois",
                    "pos_x": "2.312736251060262",
                    "pos_y": "48.65281140144265"
                }, 
                {
                    "id": "46238-46750",
                    "name": "Saint-Michel-sur-Orge",
                    "pos_x": "2.306833164002912",
                    "pos_y": "48.635875862238876"
                }, 
                {
                    "id": "46482-46994",
                    "name": "Bretigny-sur-Orge",
                    "pos_x": "2.302059694247387",
                    "pos_y": "48.60674495256192"
                }, 
                {
                    "id": "46239-46751",
                    "name": "Marolles-en-Hurepoix",
                    "pos_x": "2.290924469845003",
                    "pos_y": "48.56559386282989"
                }, 
                {
                    "id": "46531-47043",
                    "name": "Bouray",
                    "pos_x": "2.290082513828219",
                    "pos_y": "48.53289010414424"
                }, 
                {
                    "id": "46240-46752",
                    "name": "Lardy",
                    "pos_x": "2.254739701073405",
                    "pos_y": "48.52040359106149"
                }, 
                {
                    "id": "46241-46753",
                    "name": "Chamarande",
                    "pos_x": "2.215517810582092",
                    "pos_y": "48.51424587619093"
                }, 
                {
                    "id": "46440-46952",
                    "name": "Etrechy",
                    "pos_x": "2.194581699172116",
                    "pos_y": "48.493644578487505"
                }, 
                {
                    "id": "46242-46754",
                    "name": "Etampes",
                    "pos_x": "2.159530587565154",
                    "pos_y": "48.436923937640294"
                }, 
                {
                    "id": "46243-46755",
                    "name": "Saint-Martin d'Etampes",
                    "pos_x": "2.145246592903116",
                    "pos_y": "48.42736258418355"
                }]
        }, 
        {
            "line": "C",
            "color": "#F9D600",
            "id": "1030",
            "stations": [
                {
                    "id": "2924301-2924302",
                    "name": "Gare d'Austerlitz Grandes Lignes",
                    "pos_x": "2.365433384726205",
                    "pos_y": "48.842528026791484"
                }, 
                {
                    "id": "162240-162241",
                    "name": "Pontoise",
                    "pos_x": "2.095195067225969",
                    "pos_y": "49.04664576264113"
                }, 
                {
                    "id": "162242-162243",
                    "name": "Saint-Ouen-l'Aumone",
                    "pos_x": "2.105110703444507",
                    "pos_y": "49.045311648350264"
                }, 
                {
                    "id": "171851-171852",
                    "name": "Saint-Ouen-l'Aumone-Liesse",
                    "pos_x": "2.128263873923673",
                    "pos_y": "49.033987636271455"
                }, 
                {
                    "id": "162244-162245",
                    "name": "Pierrelaye",
                    "pos_x": "2.154663485640923",
                    "pos_y": "49.01913673984224"
                }, 
                {
                    "id": "46276-46788",
                    "name": "Montigny-Beauchamp",
                    "pos_x": "2.197619813968745",
                    "pos_y": "49.00742329713069"
                }, 
                {
                    "id": "46277-46789",
                    "name": "Franconville Plessis-Bouchard",
                    "pos_x": "2.234276393983286",
                    "pos_y": "48.993713481284985"
                }, 
                {
                    "id": "46278-46790",
                    "name": "Cernay",
                    "pos_x": "2.257474158629373",
                    "pos_y": "48.985004700368414"
                }, 
                {
                    "id": "46486-46998",
                    "name": "Ermont-Eaubonne",
                    "pos_x": "2.272084772747633",
                    "pos_y": "48.980646100425986"
                }, 
                {
                    "id": "46279-46791",
                    "name": "Saint-Gratien",
                    "pos_x": "2.285930718208942",
                    "pos_y": "48.96358968487314"
                }, 
                {
                    "id": "46280-46792",
                    "name": "Epinay-sur-Seine",
                    "pos_x": "2.30234042019572",
                    "pos_y": "48.95339646167632"
                }, 
                {
                    "id": "46281-46793",
                    "name": "Gennevilliers",
                    "pos_x": "2.30794323408686",
                    "pos_y": "48.932896165549444"
                }, 
                {
                    "id": "46444-46956",
                    "name": "Les Gresillons",
                    "pos_x": "2.313835382469576",
                    "pos_y": "48.92087280345732"
                }, 
                {
                    "id": "46533-47045",
                    "name": "Saint-Ouen",
                    "pos_x": "2.322400403154985",
                    "pos_y": "48.90565495492737"
                }, 
                {
                    "id": "46282-46794",
                    "name": "Porte de Clichy",
                    "pos_x": "2.315599220546768",
                    "pos_y": "48.89416838621195"
                }, 
                {
                    "id": "46284-46796",
                    "name": "Pereire",
                    "pos_x": "2.298033303213241",
                    "pos_y": "48.88540428091779"
                }, 
                {
                    "id": "46285-46797",
                    "name": "Porte Maillot",
                    "pos_x": "2.284431219916768",
                    "pos_y": "48.87790843816007"
                }, 
                {
                    "id": "46286-46798",
                    "name": "Avenue Foch",
                    "pos_x": "2.275574526847743",
                    "pos_y": "48.870974138193766"
                }, 
                {
                    "id": "46487-46999",
                    "name": "Avenue Henri-Martin",
                    "pos_x": "2.272120621636198",
                    "pos_y": "48.864461748379675"
                }, 
                {
                    "id": "46287-46799",
                    "name": "Boulainvilliers",
                    "pos_x": "2.27516715468514",
                    "pos_y": "48.8565315515406"
                }, 
                {
                    "id": "46288-46800",
                    "name": "Kennedy Radio-France",
                    "pos_x": "2.279487064975001",
                    "pos_y": "48.85364805626964"
                }, 
                {
                    "id": "46289-46801",
                    "name": "Champ de Mars-Tour Eiffel",
                    "pos_x": "2.290391553460649",
                    "pos_y": "48.857293413870465"
                }, 
                {
                    "id": "46290-46802",
                    "name": "Pont de l'alma",
                    "pos_x": "2.300989969386769",
                    "pos_y": "48.86266245169434"
                }, 
                {
                    "id": "46445-46957",
                    "name": "Invalides",
                    "pos_x": "2.313911078538979",
                    "pos_y": "48.86290189176217"
                }, 
                {
                    "id": "46291-46803",
                    "name": "Musee d'Orsay",
                    "pos_x": "2.325620298752375",
                    "pos_y": "48.860708229865644"
                }, 
                {
                    "id": "46292-46804",
                    "name": "Saint-Michel Notre-Dame",
                    "pos_x": "2.346034984443716",
                    "pos_y": "48.85333579648197"
                }, 
                {
                    "id": "46293-46805",
                    "name": "Gare d'Austerlitz",
                    "pos_x": "2.365433384726205",
                    "pos_y": "48.842528026791484"
                }, 
                {
                    "id": "142853-142854",
                    "name": "Bibliotheque-Francois Mitterrand",
                    "pos_x": "2.376695892136014",
                    "pos_y": "48.82987504370409"
                }, 
                {
                    "id": "142855-142856",
                    "name": "Ivry-sur-Seine",
                    "pos_x": "2.391686971662538",
                    "pos_y": "48.813989052009454"
                }, 
                {
                    "id": "142857-142858",
                    "name": "Vitry-sur-Seine",
                    "pos_x": "2.402712818542927",
                    "pos_y": "48.800209398351384"
                }, 
                {
                    "id": "142859-142860",
                    "name": "Les Ardoines",
                    "pos_x": "2.409541655099439",
                    "pos_y": "48.7825054354935"
                }, 
                {
                    "id": "46294-46806",
                    "name": "Choisy-le-Roi",
                    "pos_x": "2.411386724936104",
                    "pos_y": "48.76378680955171"
                }, 
                {
                    "id": "142877-142878",
                    "name": "Les Saules",
                    "pos_x": "2.417520977896491",
                    "pos_y": "48.745072166893884"
                }, 
                {
                    "id": "142879-142880",
                    "name": "Orly-Ville",
                    "pos_x": "2.40290860736794",
                    "pos_y": "48.74187870567889"
                }, 
                {
                    "id": "46295-46807",
                    "name": "Pont de Rungis Aeroport d'Orly",
                    "pos_x": "2.373111940704935",
                    "pos_y": "48.74834968236464"
                }, 
                {
                    "id": "142881-142882",
                    "name": "Rungis-La Fraternelle",
                    "pos_x": "2.351633199531735",
                    "pos_y": "48.74019544821015"
                }, 
                {
                    "id": "142883-142884",
                    "name": "Chemin d'Antony",
                    "pos_x": "2.312711013515798",
                    "pos_y": "48.747941901886946"
                }, 
                {
                    "id": "142885-142886",
                    "name": "Massy-Verrieres",
                    "pos_x": "2.273483464396533",
                    "pos_y": "48.734716586800225"
                }, 
                {
                    "id": "46296-46808",
                    "name": "Massy-Palaiseau",
                    "pos_x": "2.257355188147784",
                    "pos_y": "48.725197641013786"
                }, 
                {
                    "id": "142897-142898",
                    "name": "Villeneuve-le-Roi",
                    "pos_x": "2.426399820474823",
                    "pos_y": "48.739830699436546"
                }, 
                {
                    "id": "142887-142888",
                    "name": "Ablon",
                    "pos_x": "2.419565024377941",
                    "pos_y": "48.72553530576058"
                }, 
                {
                    "id": "142899-142900",
                    "name": "Athis-Mons",
                    "pos_x": "2.403633104908493",
                    "pos_y": "48.71262898747625"
                }, 
                {
                    "id": "142889-142890",
                    "name": "Juvisy-sur-Orge",
                    "pos_x": "2.382757203082266",
                    "pos_y": "48.68969793365298"
                }, 
                {
                    "id": "142891-142892",
                    "name": "Savigny-sur-Orge",
                    "pos_x": "2.352481401048998",
                    "pos_y": "48.676446656997726"
                }, 
                {
                    "id": "142901-142902",
                    "name": "Epinay-sur-Orge",
                    "pos_x": "2.332622929198995",
                    "pos_y": "48.669483726107565"
                }, 
                {
                    "id": "142893-142894",
                    "name": "Sainte-Genevieve-des-Bois",
                    "pos_x": "2.312736251060262",
                    "pos_y": "48.65281140144265"
                }, 
                {
                    "id": "142895-142896",
                    "name": "Saint-Michel-sur-Orge",
                    "pos_x": "2.306833164002912",
                    "pos_y": "48.635875862238876"
                }, 
                {
                    "id": "46488-47000",
                    "name": "Bretigny-sur-Orge",
                    "pos_x": "2.302059694247387",
                    "pos_y": "48.60674495256192"
                }, 
                {
                    "id": "591238-591239",
                    "name": "La Norville Saint-Germain-les-Arpajon",
                    "pos_x": "2.266937972614161",
                    "pos_y": "48.591460820223375"
                }, 
                {
                    "id": "591240-591241",
                    "name": "Arpajon",
                    "pos_x": "2.241070082271811",
                    "pos_y": "48.586007889909155"
                }, 
                {
                    "id": "591242-591243",
                    "name": "Egly",
                    "pos_x": "2.22243331383282",
                    "pos_y": "48.58248559694799"
                }, 
                {
                    "id": "591244-591245",
                    "name": "Breuillet Bruyeres-le-Chatel",
                    "pos_x": "2.192063068770897",
                    "pos_y": "48.577508489431835"
                }, 
                {
                    "id": "591246-591247",
                    "name": "Breuillet-Village",
                    "pos_x": "2.170976265059195",
                    "pos_y": "48.56459702645802"
                }, 
                {
                    "id": "591248-591249",
                    "name": "Saint-Cheron",
                    "pos_x": "2.125707270414656",
                    "pos_y": "48.55109197558505"
                }, 
                {
                    "id": "591250-591251",
                    "name": "Sermaise",
                    "pos_x": "2.069381524887472",
                    "pos_y": "48.535806509243706"
                }, 
                {
                    "id": "591252-591253",
                    "name": "Dourdan",
                    "pos_x": "2.008771813873437",
                    "pos_y": "48.533732833977226"
                }]
        }, 
        {
            "line": "C",
            "color": "#F9D600",
            "id": "1029",
            "stations": [
                {
                    "id": "7051156-7051157",
                    "name": "Versailles Chateau-Rive Gauche",
                    "pos_x": "2.129043868731507",
                    "pos_y": "48.800215578145895"
                }, 
                {
                    "id": "46244-46756",
                    "name": "Saint-Quentin-en-Yvelines",
                    "pos_x": "2.044621987173176",
                    "pos_y": "48.787390238280715"
                }, 
                {
                    "id": "46245-46757",
                    "name": "Saint-Cyr",
                    "pos_x": "2.071847005929401",
                    "pos_y": "48.79870763528835"
                }, 
                {
                    "id": "46246-46758",
                    "name": "Versailles-Chantiers",
                    "pos_x": "2.136050488302483",
                    "pos_y": "48.795280246262216"
                }, 
                {
                    "id": "6613864-6613865",
                    "name": "Porchefontaine",
                    "pos_x": "2.152378660238759",
                    "pos_y": "48.796528182075015"
                }, 
                {
                    "id": "46483-46995",
                    "name": "Viroflay-Rive Gauche",
                    "pos_x": "2.171389812756379",
                    "pos_y": "48.80071846386355"
                }, 
                {
                    "id": "46247-46759",
                    "name": "Chaville-Velizy",
                    "pos_x": "2.183684109854236",
                    "pos_y": "48.79972882534396"
                }, 
                {
                    "id": "142903-142904",
                    "name": "Meudon-Val-Fleury",
                    "pos_x": "2.240883067974086",
                    "pos_y": "48.807492625771474"
                }, 
                {
                    "id": "142905-142906",
                    "name": "Issy",
                    "pos_x": "2.258759767033708",
                    "pos_y": "48.81967448818826"
                }, 
                {
                    "id": "46248-46760",
                    "name": "Issy-Val de Seine",
                    "pos_x": "2.263689648738453",
                    "pos_y": "48.83011963925857"
                }, 
                {
                    "id": "46441-46953",
                    "name": "Pont du Garigliano-Hopital Europeen G.Pompidou",
                    "pos_x": "2.270458243787242",
                    "pos_y": "48.83908975542995"
                }, 
                {
                    "id": "46249-46761",
                    "name": "Javel",
                    "pos_x": "2.276760967379574",
                    "pos_y": "48.84619214048855"
                }, 
                {
                    "id": "46250-46762",
                    "name": "Champ de Mars-Tour Eiffel",
                    "pos_x": "2.290391553460649",
                    "pos_y": "48.857293413870465"
                }, 
                {
                    "id": "46251-46763",
                    "name": "Pont de l'alma",
                    "pos_x": "2.300989969386769",
                    "pos_y": "48.86266245169434"
                }, 
                {
                    "id": "46252-46764",
                    "name": "Invalides",
                    "pos_x": "2.313911078538979",
                    "pos_y": "48.86290189176217"
                }, 
                {
                    "id": "46253-46765",
                    "name": "Musee d'Orsay",
                    "pos_x": "2.325620298752375",
                    "pos_y": "48.860708229865644"
                }, 
                {
                    "id": "46254-46766",
                    "name": "Saint-Michel Notre-Dame",
                    "pos_x": "2.346034984443716",
                    "pos_y": "48.85333579648197"
                }, 
                {
                    "id": "46532-47044",
                    "name": "Gare d'Austerlitz",
                    "pos_x": "2.365433384726205",
                    "pos_y": "48.842528026791484"
                }, 
                {
                    "id": "46255-46767",
                    "name": "Bibliotheque-Francois Mitterrand",
                    "pos_x": "2.376695892136014",
                    "pos_y": "48.82987504370409"
                }, 
                {
                    "id": "46484-46996",
                    "name": "Ivry-sur-Seine",
                    "pos_x": "2.391686971662538",
                    "pos_y": "48.813989052009454"
                }, 
                {
                    "id": "46256-46768",
                    "name": "Vitry-sur-Seine",
                    "pos_x": "2.402712818542927",
                    "pos_y": "48.800209398351384"
                }, 
                {
                    "id": "46257-46769",
                    "name": "Les Ardoines",
                    "pos_x": "2.409541655099439",
                    "pos_y": "48.7825054354935"
                }, 
                {
                    "id": "46442-46954",
                    "name": "Choisy-le-Roi",
                    "pos_x": "2.411386724936104",
                    "pos_y": "48.76378680955171"
                }, 
                {
                    "id": "46258-46770",
                    "name": "Villeneuve-le-Roi",
                    "pos_x": "2.426399820474823",
                    "pos_y": "48.739830699436546"
                }, 
                {
                    "id": "46259-46771",
                    "name": "Ablon",
                    "pos_x": "2.419565024377941",
                    "pos_y": "48.72553530576058"
                }, 
                {
                    "id": "46260-46772",
                    "name": "Athis-Mons",
                    "pos_x": "2.403633104908493",
                    "pos_y": "48.71262898747625"
                }, 
                {
                    "id": "46261-46773",
                    "name": "Juvisy-sur-Orge",
                    "pos_x": "2.382757203082266",
                    "pos_y": "48.68969793365298"
                }, 
                {
                    "id": "46262-46774",
                    "name": "Savigny-sur-Orge",
                    "pos_x": "2.352481401048998",
                    "pos_y": "48.676446656997726"
                }, 
                {
                    "id": "46263-46775",
                    "name": "Epinay-sur-Orge",
                    "pos_x": "2.332622929198995",
                    "pos_y": "48.669483726107565"
                }, 
                {
                    "id": "46264-46776",
                    "name": "Sainte-Genevieve-des-Bois",
                    "pos_x": "2.312736251060262",
                    "pos_y": "48.65281140144265"
                }, 
                {
                    "id": "46485-46997",
                    "name": "Saint-Michel-sur-Orge",
                    "pos_x": "2.306833164002912",
                    "pos_y": "48.635875862238876"
                }, 
                {
                    "id": "46265-46777",
                    "name": "Bretigny-sur-Orge",
                    "pos_x": "2.302059694247387",
                    "pos_y": "48.60674495256192"
                }, 
                {
                    "id": "46266-46778",
                    "name": "La Norville Saint-Germain-les-Arpajon",
                    "pos_x": "2.266937972614161",
                    "pos_y": "48.591460820223375"
                }, 
                {
                    "id": "46443-46955",
                    "name": "Arpajon",
                    "pos_x": "2.241070082271811",
                    "pos_y": "48.586007889909155"
                }, 
                {
                    "id": "46267-46779",
                    "name": "Egly",
                    "pos_x": "2.22243331383282",
                    "pos_y": "48.58248559694799"
                }, 
                {
                    "id": "46268-46780",
                    "name": "Breuillet Bruyeres-le-Chatel",
                    "pos_x": "2.192063068770897",
                    "pos_y": "48.577508489431835"
                }, 
                {
                    "id": "46269-46781",
                    "name": "Breuillet-Village",
                    "pos_x": "2.170976265059195",
                    "pos_y": "48.56459702645802"
                }, 
                {
                    "id": "46270-46782",
                    "name": "Saint-Cheron",
                    "pos_x": "2.125707270414656",
                    "pos_y": "48.55109197558505"
                }, 
                {
                    "id": "46271-46783",
                    "name": "Sermaise",
                    "pos_x": "2.069381524887472",
                    "pos_y": "48.535806509243706"
                }, 
                {
                    "id": "46272-46784",
                    "name": "Dourdan",
                    "pos_x": "2.008771813873437",
                    "pos_y": "48.533732833977226"
                }, 
                {
                    "id": "46273-46785",
                    "name": "Dourdan-la-Foret",
                    "pos_x": "1.995901987654023",
                    "pos_y": "48.5356206225617"
                }]
        }, 
        {
            "line": "D",
            "color": "#32A946",
            "id": "1273",
            "stations": [
                {
                    "id": "60316-60317",
                    "name": "Creil",
                    "pos_x": "2.468914115351039",
                    "pos_y": "49.26394414450533"
                }, 
                {
                    "id": "60314-60315",
                    "name": "Chantilly-Gouvieux",
                    "pos_x": "2.459520081112193",
                    "pos_y": "49.1873335365493"
                }, 
                {
                    "id": "60312-60313",
                    "name": "Orry-la-Ville Coye",
                    "pos_x": "2.490178985421196",
                    "pos_y": "49.13828637527201"
                }, 
                {
                    "id": "60310-60311",
                    "name": "La Borne-Blanche",
                    "pos_x": "2.506143689252232",
                    "pos_y": "49.12678094198271"
                }, 
                {
                    "id": "60308-60309",
                    "name": "Survilliers-Fosses",
                    "pos_x": "2.525531713983826",
                    "pos_y": "49.09958694009281"
                }, 
                {
                    "id": "60306-60307",
                    "name": "Louvres",
                    "pos_x": "2.501758065837831",
                    "pos_y": "49.049325601784794"
                }, 
                {
                    "id": "60304-60305",
                    "name": "Les Noues",
                    "pos_x": "2.478033366491636",
                    "pos_y": "49.03318276813804"
                }, 
                {
                    "id": "60302-60303",
                    "name": "Goussainville",
                    "pos_x": "2.462168964768089",
                    "pos_y": "49.023161999024914"
                }, 
                {
                    "id": "60300-60301",
                    "name": "Villiers-le-Bel (Gonesse - Arnouville)",
                    "pos_x": "2.416187488926984",
                    "pos_y": "48.99377714689271"
                }, 
                {
                    "id": "60298-60299",
                    "name": "Garges-Sarcelles",
                    "pos_x": "2.39059365127582",
                    "pos_y": "48.97674784828698"
                }, 
                {
                    "id": "60296-60297",
                    "name": "Pierrefitte Stains",
                    "pos_x": "2.372103138402569",
                    "pos_y": "48.96375542962029"
                }, 
                {
                    "id": "60294-60295",
                    "name": "Saint-Denis",
                    "pos_x": "2.345604378196291",
                    "pos_y": "48.93445554506131"
                }, 
                {
                    "id": "132634-132635",
                    "name": "Stade de France-Saint-Denis",
                    "pos_x": "2.350389537900993",
                    "pos_y": "48.917567175685384"
                }, 
                {
                    "id": "60288-60289",
                    "name": "Gare du Nord",
                    "pos_x": "2.357115334947971",
                    "pos_y": "48.88076895833307"
                }, 
                {
                    "id": "60286-60287",
                    "name": "Chatelet-Les Halles",
                    "pos_x": "2.347012687216214",
                    "pos_y": "48.86182227459668"
                }, 
                {
                    "id": "60320-60321",
                    "name": "Gare de Lyon (Banlieue)",
                    "pos_x": "2.373916471169029",
                    "pos_y": "48.8437725768586"
                }, 
                {
                    "id": "5476921-5476922",
                    "name": "Gare du Nord (Surface)",
                    "pos_x": "2.357115334947971",
                    "pos_y": "48.88076895833307"
                }, 
                {
                    "id": "60318-60319",
                    "name": "Gare de Lyon",
                    "pos_x": "2.373259976710645",
                    "pos_y": "48.84413934985302"
                }, 
                {
                    "id": "60322-60323",
                    "name": "Maisons-Alfort Alfortville",
                    "pos_x": "2.426482408484048",
                    "pos_y": "48.80204938032392"
                }, 
                {
                    "id": "60324-60325",
                    "name": "Le Vert de Maisons",
                    "pos_x": "2.432070117953792",
                    "pos_y": "48.78891489669564"
                }, 
                {
                    "id": "4473198-4473199",
                    "name": "Creteil-Pompadour",
                    "pos_x": "2.435306339706323",
                    "pos_y": "48.771266038121055"
                }, 
                {
                    "id": "60328-60329",
                    "name": "Villeneuve-Triage",
                    "pos_x": "2.438344239163614",
                    "pos_y": "48.745230819408114"
                }, 
                {
                    "id": "60330-60331",
                    "name": "Villeneuve-Saint-Georges",
                    "pos_x": "2.446135830934545",
                    "pos_y": "48.73011683142026"
                }, 
                {
                    "id": "60387-60388",
                    "name": "Montgeron Crosne",
                    "pos_x": "2.4622822460488",
                    "pos_y": "48.70823782858778"
                }, 
                {
                    "id": "60389-60390",
                    "name": "Yerres",
                    "pos_x": "2.484245146583624",
                    "pos_y": "48.70661094689584"
                }, 
                {
                    "id": "60391-60392",
                    "name": "Brunoy",
                    "pos_x": "2.506078154570987",
                    "pos_y": "48.69973243301001"
                }, 
                {
                    "id": "60393-60394",
                    "name": "Boussy-Saint-Antoine",
                    "pos_x": "2.533130656571037",
                    "pos_y": "48.681016616342724"
                }, 
                {
                    "id": "60395-60396",
                    "name": "Combs-la-Ville Quincy",
                    "pos_x": "2.547548045814366",
                    "pos_y": "48.66790196104987"
                }, 
                {
                    "id": "60397-60398",
                    "name": "Lieusaint Moissy",
                    "pos_x": "2.569583548243857",
                    "pos_y": "48.62837555082435"
                }, 
                {
                    "id": "60399-60400",
                    "name": "Savigny-le-Temple Nandy",
                    "pos_x": "2.58394771106125",
                    "pos_y": "48.595563837991776"
                }, 
                {
                    "id": "60401-60402",
                    "name": "Cesson",
                    "pos_x": "2.594551816007613",
                    "pos_y": "48.564949495670916"
                }, 
                {
                    "id": "60403-60404",
                    "name": "Le Mee",
                    "pos_x": "2.625522155066302",
                    "pos_y": "48.538775256627815"
                }, 
                {
                    "id": "60405-60406",
                    "name": "Melun",
                    "pos_x": "2.654990284856376",
                    "pos_y": "48.52724332056844"
                }]
        }, 
        {
            "line": "C",
            "color": "#F9D600",
            "id": "70960",
            "stations": [
                {
                    "id": "1470497-1470498",
                    "name": "Montigny-Beauchamp",
                    "pos_x": "2.197619813968745",
                    "pos_y": "49.00742329713069"
                }, 
                {
                    "id": "1470495-1470496",
                    "name": "Franconville Plessis-Bouchard",
                    "pos_x": "2.234276393983286",
                    "pos_y": "48.993713481284985"
                }, 
                {
                    "id": "1470493-1470494",
                    "name": "Cernay",
                    "pos_x": "2.257474158629373",
                    "pos_y": "48.985004700368414"
                }, 
                {
                    "id": "1470491-1470492",
                    "name": "Ermont-Eaubonne",
                    "pos_x": "2.272084772747633",
                    "pos_y": "48.980646100425986"
                }, 
                {
                    "id": "1470489-1470490",
                    "name": "Saint-Gratien",
                    "pos_x": "2.285930718208942",
                    "pos_y": "48.96358968487314"
                }, 
                {
                    "id": "1470487-1470488",
                    "name": "Epinay-sur-Seine",
                    "pos_x": "2.30234042019572",
                    "pos_y": "48.95339646167632"
                }, 
                {
                    "id": "1470485-1470486",
                    "name": "Gennevilliers",
                    "pos_x": "2.30794323408686",
                    "pos_y": "48.932896165549444"
                }, 
                {
                    "id": "1470483-1470484",
                    "name": "Les Gresillons",
                    "pos_x": "2.313835382469576",
                    "pos_y": "48.92087280345732"
                }, 
                {
                    "id": "1470481-1470482",
                    "name": "Saint-Ouen",
                    "pos_x": "2.322400403154985",
                    "pos_y": "48.90565495492737"
                }, 
                {
                    "id": "1470479-1470480",
                    "name": "Porte de Clichy",
                    "pos_x": "2.315599220546768",
                    "pos_y": "48.89416838621195"
                }, 
                {
                    "id": "1470477-1470478",
                    "name": "Pereire",
                    "pos_x": "2.298033303213241",
                    "pos_y": "48.88540428091779"
                }, 
                {
                    "id": "1470475-1470476",
                    "name": "Porte Maillot",
                    "pos_x": "2.284431219916768",
                    "pos_y": "48.87790843816007"
                }, 
                {
                    "id": "1470473-1470474",
                    "name": "Avenue Foch",
                    "pos_x": "2.275574526847743",
                    "pos_y": "48.870974138193766"
                }, 
                {
                    "id": "1470471-1470472",
                    "name": "Avenue Henri-Martin",
                    "pos_x": "2.272120621636198",
                    "pos_y": "48.864461748379675"
                }, 
                {
                    "id": "1470469-1470470",
                    "name": "Boulainvilliers",
                    "pos_x": "2.27516715468514",
                    "pos_y": "48.8565315515406"
                }, 
                {
                    "id": "1470467-1470468",
                    "name": "Kennedy Radio-France",
                    "pos_x": "2.279487064975001",
                    "pos_y": "48.85364805626964"
                }, 
                {
                    "id": "1470465-1470466",
                    "name": "Champ de Mars-Tour Eiffel",
                    "pos_x": "2.290391553460649",
                    "pos_y": "48.857293413870465"
                }, 
                {
                    "id": "1470463-1470464",
                    "name": "Pont de l'alma",
                    "pos_x": "2.300989969386769",
                    "pos_y": "48.86266245169434"
                }, 
                {
                    "id": "1470461-1470462",
                    "name": "Invalides",
                    "pos_x": "2.313911078538979",
                    "pos_y": "48.86290189176217"
                }, 
                {
                    "id": "1470459-1470460",
                    "name": "Musee d'Orsay",
                    "pos_x": "2.325620298752375",
                    "pos_y": "48.860708229865644"
                }, 
                {
                    "id": "1470457-1470458",
                    "name": "Saint-Michel Notre-Dame",
                    "pos_x": "2.346034984443716",
                    "pos_y": "48.85333579648197"
                }, 
                {
                    "id": "1470455-1470456",
                    "name": "Gare d'Austerlitz",
                    "pos_x": "2.365433384726205",
                    "pos_y": "48.842528026791484"
                }, 
                {
                    "id": "5815093-5815094",
                    "name": "Gare d'Austerlitz Grandes Lignes",
                    "pos_x": "2.365433384726205",
                    "pos_y": "48.842528026791484"
                }, 
                {
                    "id": "1470453-1470454",
                    "name": "Bibliotheque-Francois Mitterrand",
                    "pos_x": "2.376695892136014",
                    "pos_y": "48.82987504370409"
                }, 
                {
                    "id": "1470451-1470452",
                    "name": "Choisy-le-Roi",
                    "pos_x": "2.411386724936104",
                    "pos_y": "48.76378680955171"
                }, 
                {
                    "id": "1470449-1470450",
                    "name": "Juvisy-sur-Orge",
                    "pos_x": "2.382757203082266",
                    "pos_y": "48.68969793365298"
                }, 
                {
                    "id": "1470447-1470448",
                    "name": "Savigny-sur-Orge",
                    "pos_x": "2.352481401048998",
                    "pos_y": "48.676446656997726"
                }, 
                {
                    "id": "1470445-1470446",
                    "name": "Epinay-sur-Orge",
                    "pos_x": "2.332622929198995",
                    "pos_y": "48.669483726107565"
                }, 
                {
                    "id": "1470443-1470444",
                    "name": "Sainte-Genevieve-des-Bois",
                    "pos_x": "2.312736251060262",
                    "pos_y": "48.65281140144265"
                }, 
                {
                    "id": "1470441-1470442",
                    "name": "Saint-Michel-sur-Orge",
                    "pos_x": "2.306833164002912",
                    "pos_y": "48.635875862238876"
                }, 
                {
                    "id": "1470439-1470440",
                    "name": "Bretigny-sur-Orge",
                    "pos_x": "2.302059694247387",
                    "pos_y": "48.60674495256192"
                }, 
                {
                    "id": "1470437-1470438",
                    "name": "La Norville Saint-Germain-les-Arpajon",
                    "pos_x": "2.266937972614161",
                    "pos_y": "48.591460820223375"
                }, 
                {
                    "id": "1470435-1470436",
                    "name": "Arpajon",
                    "pos_x": "2.241070082271811",
                    "pos_y": "48.586007889909155"
                }, 
                {
                    "id": "1470433-1470434",
                    "name": "Egly",
                    "pos_x": "2.22243331383282",
                    "pos_y": "48.58248559694799"
                }, 
                {
                    "id": "1470431-1470432",
                    "name": "Breuillet Bruyeres-le-Chatel",
                    "pos_x": "2.192063068770897",
                    "pos_y": "48.577508489431835"
                }, 
                {
                    "id": "1470429-1470430",
                    "name": "Breuillet-Village",
                    "pos_x": "2.170976265059195",
                    "pos_y": "48.56459702645802"
                }, 
                {
                    "id": "1470427-1470428",
                    "name": "Saint-Cheron",
                    "pos_x": "2.125707270414656",
                    "pos_y": "48.55109197558505"
                }, 
                {
                    "id": "1470425-1470426",
                    "name": "Sermaise",
                    "pos_x": "2.069381524887472",
                    "pos_y": "48.535806509243706"
                }, 
                {
                    "id": "1470423-1470424",
                    "name": "Dourdan",
                    "pos_x": "2.008771813873437",
                    "pos_y": "48.533732833977226"
                }, 
                {
                    "id": "1470421-",
                    "name": "Dourdan-la-Foret",
                    "pos_x": "1.995901987654023",
                    "pos_y": "48.5356206225617"
                }, 
                {
                    "id": "1470511-1470512",
                    "name": "Marolles-en-Hurepoix",
                    "pos_x": "2.290924469845003",
                    "pos_y": "48.56559386282989"
                }, 
                {
                    "id": "1470509-1470510",
                    "name": "Bouray",
                    "pos_x": "2.290082513828219",
                    "pos_y": "48.53289010414424"
                }, 
                {
                    "id": "1470507-1470508",
                    "name": "Lardy",
                    "pos_x": "2.254739701073405",
                    "pos_y": "48.52040359106149"
                }, 
                {
                    "id": "1470505-1470506",
                    "name": "Chamarande",
                    "pos_x": "2.215517810582092",
                    "pos_y": "48.51424587619093"
                }, 
                {
                    "id": "1470503-1470504",
                    "name": "Etrechy",
                    "pos_x": "2.194581699172116",
                    "pos_y": "48.493644578487505"
                }, 
                {
                    "id": "1470501-1470502",
                    "name": "Etampes",
                    "pos_x": "2.159530587565154",
                    "pos_y": "48.436923937640294"
                }, 
                {
                    "id": "1470499-1470500",
                    "name": "Saint-Martin d'Etampes",
                    "pos_x": "2.145246592903116",
                    "pos_y": "48.42736258418355"
                }, 
                {
                    "id": "-1470422",
                    "name": "Dourdan-la Foret",
                    "pos_x": "1.995901987654023",
                    "pos_y": "48.5356206225617"
                }]
        }, 
        {
            "line": "C",
            "color": "#F9D600",
            "id": "81323",
            "stations": [
                {
                    "id": "1669904-1670015",
                    "name": "Gare d'Austerlitz Grandes Lignes",
                    "pos_x": "2.365433384726205",
                    "pos_y": "48.842528026791484"
                }, 
                {
                    "id": "1670016-1670017",
                    "name": "Bibliotheque-Francois Mitterrand",
                    "pos_x": "2.376695892136014",
                    "pos_y": "48.82987504370409"
                }, 
                {
                    "id": "1670018-1670019",
                    "name": "Choisy-le-Roi",
                    "pos_x": "2.411386724936104",
                    "pos_y": "48.76378680955171"
                }, 
                {
                    "id": "1670020-1670021",
                    "name": "Villeneuve-le-Roi",
                    "pos_x": "2.426399820474823",
                    "pos_y": "48.739830699436546"
                }, 
                {
                    "id": "1670022-1670023",
                    "name": "Ablon",
                    "pos_x": "2.419565024377941",
                    "pos_y": "48.72553530576058"
                }, 
                {
                    "id": "1670024-1670025",
                    "name": "Athis-Mons",
                    "pos_x": "2.403633104908493",
                    "pos_y": "48.71262898747625"
                }, 
                {
                    "id": "1670026-1670027",
                    "name": "Juvisy-sur-Orge",
                    "pos_x": "2.382757203082266",
                    "pos_y": "48.68969793365298"
                }, 
                {
                    "id": "1673397-1673398",
                    "name": "Bretigny-sur-Orge",
                    "pos_x": "2.302059694247387",
                    "pos_y": "48.60674495256192"
                }, 
                {
                    "id": "1673399-1673400",
                    "name": "Marolles-en-Hurepoix",
                    "pos_x": "2.290924469845003",
                    "pos_y": "48.56559386282989"
                }, 
                {
                    "id": "1673401-1673402",
                    "name": "Bouray",
                    "pos_x": "2.290082513828219",
                    "pos_y": "48.53289010414424"
                }, 
                {
                    "id": "1673403-1673404",
                    "name": "Lardy",
                    "pos_x": "2.254739701073405",
                    "pos_y": "48.52040359106149"
                }, 
                {
                    "id": "1673405-1673406",
                    "name": "Chamarande",
                    "pos_x": "2.215517810582092",
                    "pos_y": "48.51424587619093"
                }, 
                {
                    "id": "1673407-1673408",
                    "name": "Etrechy",
                    "pos_x": "2.194581699172116",
                    "pos_y": "48.493644578487505"
                }, 
                {
                    "id": "1673409-1673410",
                    "name": "Etampes",
                    "pos_x": "2.159530587565154",
                    "pos_y": "48.436923937640294"
                }, 
                {
                    "id": "1673411-1673412",
                    "name": "Saint-Martin d'Etampes",
                    "pos_x": "2.145246592903116",
                    "pos_y": "48.42736258418355"
                }]
        }, 
        {
            "line": "B",
            "color": "#3C91DC",
            "id": "78",
            "stations": [
                {
                    "id": "48431-48432",
                    "name": "Aeroport Charles de Gaulle 2 TGV",
                    "pos_x": "2.57058948552452",
                    "pos_y": "49.00468746180567"
                }, 
                {
                    "id": "1706-2451",
                    "name": "Aeroport Charles de Gaulle 1",
                    "pos_x": "2.561232695225106",
                    "pos_y": "49.00975645213836"
                }, 
                {
                    "id": "1777-2387",
                    "name": "Parc des Expositions",
                    "pos_x": "2.514360284175948",
                    "pos_y": "48.97342490631064"
                }, 
                {
                    "id": "1628-2508",
                    "name": "Villepinte",
                    "pos_x": "2.512644627819613",
                    "pos_y": "48.962709513300425"
                }, 
                {
                    "id": "1663-2507",
                    "name": "Sevran-Beaudottes",
                    "pos_x": "2.524716389411973",
                    "pos_y": "48.9476075558527"
                }, 
                {
                    "id": "1821-2360",
                    "name": "Mitry-Claye",
                    "pos_x": "2.642406305029859",
                    "pos_y": "48.97585875582702"
                }, 
                {
                    "id": "1697-2473",
                    "name": "Villeparisis",
                    "pos_x": "2.603135305118449",
                    "pos_y": "48.9531483875826"
                }, 
                {
                    "id": "1693-2503",
                    "name": "Vert-Galant",
                    "pos_x": "2.566448016970496",
                    "pos_y": "48.94418106507546"
                }, 
                {
                    "id": "1664-2474",
                    "name": "Sevran Livry",
                    "pos_x": "2.534714977472367",
                    "pos_y": "48.936280185662376"
                }, 
                {
                    "id": "2056-2105",
                    "name": "Aulnay-sous-Bois",
                    "pos_x": "2.495513141228173",
                    "pos_y": "48.932196005056994"
                }, 
                {
                    "id": "2070-2119",
                    "name": "Blanc-Mesnil",
                    "pos_x": "2.475674370833512",
                    "pos_y": "48.93230541606912"
                }, 
                {
                    "id": "1999-2188",
                    "name": "Drancy",
                    "pos_x": "2.454766382765777",
                    "pos_y": "48.93270621869947"
                }, 
                {
                    "id": "1923-2248",
                    "name": "Le Bourget",
                    "pos_x": "2.425791426914742",
                    "pos_y": "48.9307395712233"
                }, 
                {
                    "id": "2054-2103",
                    "name": "La Courneuve-Aubervilliers",
                    "pos_x": "2.386388291064694",
                    "pos_y": "48.92435387966092"
                }, 
                {
                    "id": "1918-2243",
                    "name": "La Plaine-Stade de France",
                    "pos_x": "2.362665600183825",
                    "pos_y": "48.91811380397261"
                }, 
                {
                    "id": "2077-2126",
                    "name": "Gare du Nord",
                    "pos_x": "2.357115334947971",
                    "pos_y": "48.88076895833307"
                }, 
                {
                    "id": "1968-2223",
                    "name": "Chatelet-Les Halles",
                    "pos_x": "2.347012687216214",
                    "pos_y": "48.86182227459668"
                }, 
                {
                    "id": "1672-2482",
                    "name": "Saint-Michel Notre-Dame",
                    "pos_x": "2.346034984443716",
                    "pos_y": "48.85333579648197"
                }, 
                {
                    "id": "1866-2333",
                    "name": "Luxembourg",
                    "pos_x": "2.339927999715897",
                    "pos_y": "48.845743073225805"
                }, 
                {
                    "id": "1650-2530",
                    "name": "Port-Royal",
                    "pos_x": "2.337096430891528",
                    "pos_y": "48.8400337865188"
                }, 
                {
                    "id": "1998-2187",
                    "name": "Denfert-Rochereau",
                    "pos_x": "2.332852309960891",
                    "pos_y": "48.8342929804732"
                }, 
                {
                    "id": "1976-2166",
                    "name": "Cite Universitaire",
                    "pos_x": "2.338978472013182",
                    "pos_y": "48.82108965061529"
                }, 
                {
                    "id": "1960-2215",
                    "name": "Gentilly",
                    "pos_x": "2.340891132421861",
                    "pos_y": "48.81522993651496"
                }, 
                {
                    "id": "1921-2246",
                    "name": "Laplace",
                    "pos_x": "2.334354306939409",
                    "pos_y": "48.808296586817626"
                }, 
                {
                    "id": "2047-2097",
                    "name": "Arcueil-Cachan",
                    "pos_x": "2.328136923064751",
                    "pos_y": "48.79889250008067"
                }, 
                {
                    "id": "2059-2108",
                    "name": "Bagneux",
                    "pos_x": "2.322201633670121",
                    "pos_y": "48.793336296236205"
                }, 
                {
                    "id": "2006-2195",
                    "name": "Bourg-la-Reine",
                    "pos_x": "2.312307716888594",
                    "pos_y": "48.78031379639698"
                }, 
                {
                    "id": "1660-2540",
                    "name": "Sceaux",
                    "pos_x": "2.297647679167028",
                    "pos_y": "48.781356720431795"
                }, 
                {
                    "id": "1942-2197",
                    "name": "Fontenay-aux-Roses",
                    "pos_x": "2.292492980557762",
                    "pos_y": "48.78761467998698"
                }, 
                {
                    "id": "1705-2450",
                    "name": "Robinson",
                    "pos_x": "2.281430595425078",
                    "pos_y": "48.78023729800771"
                }, 
                {
                    "id": "1778-2388",
                    "name": "Parc de Sceaux",
                    "pos_x": "2.310205451875209",
                    "pos_y": "48.77072199351427"
                }, 
                {
                    "id": "1912-2237",
                    "name": "La Croix-de-Berny",
                    "pos_x": "2.304227346191482",
                    "pos_y": "48.761693690399476"
                }, 
                {
                    "id": "2045-2095",
                    "name": "Antony",
                    "pos_x": "2.30098685572291",
                    "pos_y": "48.75494652643051"
                }, 
                {
                    "id": "1941-2231",
                    "name": "Fontaine-Michalon",
                    "pos_x": "2.296393157536253",
                    "pos_y": "48.743373402021376"
                }, 
                {
                    "id": "1853-2320",
                    "name": "Les Baconnets",
                    "pos_x": "2.287667495450806",
                    "pos_y": "48.73968104342992"
                }, 
                {
                    "id": "1810-2349",
                    "name": "Massy-Verrieres",
                    "pos_x": "2.273483464396533",
                    "pos_y": "48.734716586800225"
                }, 
                {
                    "id": "1809-2348",
                    "name": "Massy-Palaiseau",
                    "pos_x": "2.257355188147784",
                    "pos_y": "48.725197641013786"
                }, 
                {
                    "id": "1775-2385",
                    "name": "Palaiseau",
                    "pos_x": "2.245672514581905",
                    "pos_y": "48.716946287585145"
                }, 
                {
                    "id": "1776-2386",
                    "name": "Palaiseau Villebon",
                    "pos_x": "2.237314364639455",
                    "pos_y": "48.708140583645324"
                }, 
                {
                    "id": "1865-2332",
                    "name": "Lozere",
                    "pos_x": "2.212262378017492",
                    "pos_y": "48.705968984822285"
                }, 
                {
                    "id": "1924-2249",
                    "name": "Le Guichet",
                    "pos_x": "2.192734884806757",
                    "pos_y": "48.70540392478545"
                }, 
                {
                    "id": "1771-2381",
                    "name": "Orsay-Ville",
                    "pos_x": "2.181054437696623",
                    "pos_y": "48.697505669894596"
                }, 
                {
                    "id": "2011-2130",
                    "name": "Bures-sur-Yvette",
                    "pos_x": "2.16437824278855",
                    "pos_y": "48.69625274691505"
                }, 
                {
                    "id": "1914-2239",
                    "name": "La Hacquiniere",
                    "pos_x": "2.151642038623571",
                    "pos_y": "48.695264122108014"
                }, 
                {
                    "id": "2078-2127",
                    "name": "Gif-sur-Yvette",
                    "pos_x": "2.136566717058361",
                    "pos_y": "48.69819697630193"
                }, 
                {
                    "id": "1988-2178",
                    "name": "Courcelle-sur-Yvette",
                    "pos_x": "2.097975855687467",
                    "pos_y": "48.70121772119422"
                }, 
                {
                    "id": "1673-2483",
                    "name": "Saint-Remy-les-Chevreuse",
                    "pos_x": "2.071242849022199",
                    "pos_y": "48.70275104299783"
                }, 
                {
                    "id": "-2451",
                    "name": "Aeroport Charles de Gaulle 1",
                    "pos_x": "2.561232695225106",
                    "pos_y": "49.00975645213836"
                }]
        }, 
        {
            "line": "C",
            "color": "#F9D600",
            "id": "1032",
            "stations": [
                {
                    "id": "46311-46823",
                    "name": "Versailles Chateau-Rive Gauche",
                    "pos_x": "2.129043868731507",
                    "pos_y": "48.800215578145895"
                }, 
                {
                    "id": "46312-46824",
                    "name": "Porchefontaine",
                    "pos_x": "2.152378660238759",
                    "pos_y": "48.796528182075015"
                }, 
                {
                    "id": "46313-46825",
                    "name": "Viroflay-Rive Gauche",
                    "pos_x": "2.171389812756379",
                    "pos_y": "48.80071846386355"
                }, 
                {
                    "id": "46490-47002",
                    "name": "Chaville-Velizy",
                    "pos_x": "2.183684109854236",
                    "pos_y": "48.79972882534396"
                }, 
                {
                    "id": "46314-46826",
                    "name": "Meudon-Val-Fleury",
                    "pos_x": "2.240883067974086",
                    "pos_y": "48.807492625771474"
                }, 
                {
                    "id": "46315-46827",
                    "name": "Issy",
                    "pos_x": "2.258759767033708",
                    "pos_y": "48.81967448818826"
                }, 
                {
                    "id": "46316-46828",
                    "name": "Issy-Val de Seine",
                    "pos_x": "2.263689648738453",
                    "pos_y": "48.83011963925857"
                }, 
                {
                    "id": "46317-46829",
                    "name": "Pont du Garigliano-Hopital Europeen G.Pompidou",
                    "pos_x": "2.270458243787242",
                    "pos_y": "48.83908975542995"
                }, 
                {
                    "id": "46318-46830",
                    "name": "Javel",
                    "pos_x": "2.276760967379574",
                    "pos_y": "48.84619214048855"
                }, 
                {
                    "id": "46319-46831",
                    "name": "Champ de Mars-Tour Eiffel",
                    "pos_x": "2.290391553460649",
                    "pos_y": "48.857293413870465"
                }, 
                {
                    "id": "46452-46964",
                    "name": "Pont de l'alma",
                    "pos_x": "2.300989969386769",
                    "pos_y": "48.86266245169434"
                }, 
                {
                    "id": "46320-46832",
                    "name": "Invalides",
                    "pos_x": "2.313911078538979",
                    "pos_y": "48.86290189176217"
                }, 
                {
                    "id": "46535-47047",
                    "name": "Musee d'Orsay",
                    "pos_x": "2.325620298752375",
                    "pos_y": "48.860708229865644"
                }, 
                {
                    "id": "46321-46833",
                    "name": "Saint-Michel Notre-Dame",
                    "pos_x": "2.346034984443716",
                    "pos_y": "48.85333579648197"
                }, 
                {
                    "id": "46491-47003",
                    "name": "Gare d'Austerlitz",
                    "pos_x": "2.365433384726205",
                    "pos_y": "48.842528026791484"
                }, 
                {
                    "id": "142861-142862",
                    "name": "Bibliotheque-Francois Mitterrand",
                    "pos_x": "2.376695892136014",
                    "pos_y": "48.82987504370409"
                }, 
                {
                    "id": "142863-142864",
                    "name": "Ivry-sur-Seine",
                    "pos_x": "2.391686971662538",
                    "pos_y": "48.813989052009454"
                }, 
                {
                    "id": "142865-142866",
                    "name": "Vitry-sur-Seine",
                    "pos_x": "2.402712818542927",
                    "pos_y": "48.800209398351384"
                }, 
                {
                    "id": "142867-142868",
                    "name": "Les Ardoines",
                    "pos_x": "2.409541655099439",
                    "pos_y": "48.7825054354935"
                }, 
                {
                    "id": "46322-46834",
                    "name": "Choisy-le-Roi",
                    "pos_x": "2.411386724936104",
                    "pos_y": "48.76378680955171"
                }, 
                {
                    "id": "46323-46835",
                    "name": "Villeneuve-le-Roi",
                    "pos_x": "2.426399820474823",
                    "pos_y": "48.739830699436546"
                }, 
                {
                    "id": "46324-46836",
                    "name": "Ablon",
                    "pos_x": "2.419565024377941",
                    "pos_y": "48.72553530576058"
                }, 
                {
                    "id": "46325-46837",
                    "name": "Athis-Mons",
                    "pos_x": "2.403633104908493",
                    "pos_y": "48.71262898747625"
                }, 
                {
                    "id": "46326-46838",
                    "name": "Juvisy-sur-Orge",
                    "pos_x": "2.382757203082266",
                    "pos_y": "48.68969793365298"
                }, 
                {
                    "id": "46327-46839",
                    "name": "Savigny-sur-Orge",
                    "pos_x": "2.352481401048998",
                    "pos_y": "48.676446656997726"
                }, 
                {
                    "id": "46328-46840",
                    "name": "Epinay-sur-Orge",
                    "pos_x": "2.332622929198995",
                    "pos_y": "48.669483726107565"
                }, 
                {
                    "id": "46329-46841",
                    "name": "Sainte-Genevieve-des-Bois",
                    "pos_x": "2.312736251060262",
                    "pos_y": "48.65281140144265"
                }, 
                {
                    "id": "46453-46965",
                    "name": "Saint-Michel-sur-Orge",
                    "pos_x": "2.306833164002912",
                    "pos_y": "48.635875862238876"
                }, 
                {
                    "id": "46330-46842",
                    "name": "Bretigny-sur-Orge",
                    "pos_x": "2.302059694247387",
                    "pos_y": "48.60674495256192"
                }]
        }, 
        {
            "line": "D",
            "color": "#32A946",
            "id": "1275",
            "stations": [
                {
                    "id": "591221-591222",
                    "name": "Creil",
                    "pos_x": "2.468914115351039",
                    "pos_y": "49.26394414450533"
                }, 
                {
                    "id": "591223-591224",
                    "name": "Chantilly-Gouvieux",
                    "pos_x": "2.459520081112193",
                    "pos_y": "49.1873335365493"
                }, 
                {
                    "id": "591225-591226",
                    "name": "Orry-la-Ville Coye",
                    "pos_x": "2.490178985421196",
                    "pos_y": "49.13828637527201"
                }, 
                {
                    "id": "591227-591228",
                    "name": "La Borne-Blanche",
                    "pos_x": "2.506143689252232",
                    "pos_y": "49.12678094198271"
                }, 
                {
                    "id": "591229-591230",
                    "name": "Survilliers-Fosses",
                    "pos_x": "2.525531713983826",
                    "pos_y": "49.09958694009281"
                }, 
                {
                    "id": "591231-591232",
                    "name": "Louvres",
                    "pos_x": "2.501758065837831",
                    "pos_y": "49.049325601784794"
                }, 
                {
                    "id": "591233-591234",
                    "name": "Les Noues",
                    "pos_x": "2.478033366491636",
                    "pos_y": "49.03318276813804"
                }, 
                {
                    "id": "60415-60468",
                    "name": "Goussainville",
                    "pos_x": "2.462168964768089",
                    "pos_y": "49.023161999024914"
                }, 
                {
                    "id": "60414-60467",
                    "name": "Villiers-le-Bel (Gonesse - Arnouville)",
                    "pos_x": "2.416187488926984",
                    "pos_y": "48.99377714689271"
                }, 
                {
                    "id": "60413-60466",
                    "name": "Garges-Sarcelles",
                    "pos_x": "2.39059365127582",
                    "pos_y": "48.97674784828698"
                }, 
                {
                    "id": "60412-60465",
                    "name": "Pierrefitte Stains",
                    "pos_x": "2.372103138402569",
                    "pos_y": "48.96375542962029"
                }, 
                {
                    "id": "60411-60464",
                    "name": "Saint-Denis",
                    "pos_x": "2.345604378196291",
                    "pos_y": "48.93445554506131"
                }, 
                {
                    "id": "132636-132637",
                    "name": "Stade de France-Saint-Denis",
                    "pos_x": "2.350389537900993",
                    "pos_y": "48.917567175685384"
                }, 
                {
                    "id": "60408-60461",
                    "name": "Gare du Nord",
                    "pos_x": "2.357115334947971",
                    "pos_y": "48.88076895833307"
                }, 
                {
                    "id": "60407-60460",
                    "name": "Chatelet-Les Halles",
                    "pos_x": "2.347012687216214",
                    "pos_y": "48.86182227459668"
                }, 
                {
                    "id": "60424-60477",
                    "name": "Gare de Lyon (Banlieue)",
                    "pos_x": "2.373916471169029",
                    "pos_y": "48.8437725768586"
                }, 
                {
                    "id": "5422314-",
                    "name": "Gare du Nord (Surface)",
                    "pos_x": "2.357115334947971",
                    "pos_y": "48.88076895833307"
                }, 
                {
                    "id": "2934503-2934504",
                    "name": "Gare de Lyon",
                    "pos_x": "2.373259976710645",
                    "pos_y": "48.84413934985302"
                }, 
                {
                    "id": "60425-60478",
                    "name": "Maisons-Alfort Alfortville",
                    "pos_x": "2.426482408484048",
                    "pos_y": "48.80204938032392"
                }, 
                {
                    "id": "60426-60479",
                    "name": "Le Vert de Maisons",
                    "pos_x": "2.432070117953792",
                    "pos_y": "48.78891489669564"
                }, 
                {
                    "id": "4473200-4473201",
                    "name": "Creteil-Pompadour",
                    "pos_x": "2.435306339706323",
                    "pos_y": "48.771266038121055"
                }, 
                {
                    "id": "60428-60481",
                    "name": "Villeneuve-Triage",
                    "pos_x": "2.438344239163614",
                    "pos_y": "48.745230819408114"
                }, 
                {
                    "id": "60429-60482",
                    "name": "Villeneuve-Saint-Georges",
                    "pos_x": "2.446135830934545",
                    "pos_y": "48.73011683142026"
                }, 
                {
                    "id": "60430-60483",
                    "name": "Vigneux-sur-Seine",
                    "pos_x": "2.414358879800508",
                    "pos_y": "48.7083664325953"
                }, 
                {
                    "id": "60431-60484",
                    "name": "Juvisy-sur-Orge",
                    "pos_x": "2.382757203082266",
                    "pos_y": "48.68969793365298"
                }, 
                {
                    "id": "60432-60485",
                    "name": "Viry-Chatillon",
                    "pos_x": "2.386783797033431",
                    "pos_y": "48.676092433958715"
                }, 
                {
                    "id": "60433-60486",
                    "name": "Ris-Orangis",
                    "pos_x": "2.415206839972445",
                    "pos_y": "48.6589754238234"
                }, 
                {
                    "id": "60434-60487",
                    "name": "Grand-Bourg",
                    "pos_x": "2.435330531548363",
                    "pos_y": "48.64848911169394"
                }, 
                {
                    "id": "60435-60488",
                    "name": "Evry Val de Seine",
                    "pos_x": "2.452289892538954",
                    "pos_y": "48.63447902331143"
                }, 
                {
                    "id": "60436-60489",
                    "name": "Grigny-Centre",
                    "pos_x": "2.396176812439178",
                    "pos_y": "48.65396975928158"
                }, 
                {
                    "id": "60437-60490",
                    "name": "Orangis Bois de l'Epine",
                    "pos_x": "2.407796287520861",
                    "pos_y": "48.63635136800817"
                }, 
                {
                    "id": "60438-60491",
                    "name": "Evry Courcouronnes",
                    "pos_x": "2.428738987347718",
                    "pos_y": "48.62602242806499"
                }, 
                {
                    "id": "60439-60492",
                    "name": "Le Bras-de-Fer",
                    "pos_x": "2.451409095593275",
                    "pos_y": "48.62333224107223"
                }, 
                {
                    "id": "60440-60493",
                    "name": "Corbeil-Essonnes",
                    "pos_x": "2.472933649102297",
                    "pos_y": "48.61342791358873"
                }, 
                {
                    "id": "60441-60494",
                    "name": "Moulin-Galant",
                    "pos_x": "2.473490366362306",
                    "pos_y": "48.58715390536035"
                }, 
                {
                    "id": "60442-60495",
                    "name": "Mennecy",
                    "pos_x": "2.432098533660357",
                    "pos_y": "48.57059685871919"
                }, 
                {
                    "id": "60443-60496",
                    "name": "Ballancourt",
                    "pos_x": "2.370518497736708",
                    "pos_y": "48.53150198648683"
                }, 
                {
                    "id": "60444-",
                    "name": "La Ferte-Alais",
                    "pos_x": "2.351858421416974",
                    "pos_y": "48.484957377176464"
                }, 
                {
                    "id": "60445-60498",
                    "name": "Boutigny",
                    "pos_x": "2.376672817155076",
                    "pos_y": "48.4344906128558"
                }, 
                {
                    "id": "60446-60499",
                    "name": "Maisse",
                    "pos_x": "2.393410724045883",
                    "pos_y": "48.39364154954012"
                }, 
                {
                    "id": "60447-60500",
                    "name": "Buno-Gironville",
                    "pos_x": "2.387209795868763",
                    "pos_y": "48.37138329049663"
                }, 
                {
                    "id": "60448-60501",
                    "name": "Boigneville",
                    "pos_x": "2.37881544334374",
                    "pos_y": "48.34166354191978"
                }, 
                {
                    "id": "60449-60502",
                    "name": "Malesherbes",
                    "pos_x": "2.401133894429584",
                    "pos_y": "48.29359176871632"
                }, 
                {
                    "id": "60444-60497",
                    "name": "La Ferte-Alais",
                    "pos_x": "2.351858421416974",
                    "pos_y": "48.484957377176464"
                }, 
                {
                    "id": "-5422315",
                    "name": "Gare du Nord (Surface)",
                    "pos_x": "2.357115334947971",
                    "pos_y": "48.88076895833307"
                }]
        }, 
        {
            "line": "D",
            "color": "#32A946",
            "id": "25065",
            "stations": [
                {
                    "id": "2695202-2695203",
                    "name": "Gare de Lyon",
                    "pos_x": "2.373259976710645",
                    "pos_y": "48.84413934985302"
                }, 
                {
                    "id": "4770532-4770533",
                    "name": "Creil",
                    "pos_x": "2.468914115351039",
                    "pos_y": "49.26394414450533"
                }, 
                {
                    "id": "4770534-4770535",
                    "name": "Chantilly-Gouvieux",
                    "pos_x": "2.459520081112193",
                    "pos_y": "49.1873335365493"
                }, 
                {
                    "id": "590097-590098",
                    "name": "Orry-la-Ville Coye",
                    "pos_x": "2.490178985421196",
                    "pos_y": "49.13828637527201"
                }, 
                {
                    "id": "590099-590100",
                    "name": "La Borne-Blanche",
                    "pos_x": "2.506143689252232",
                    "pos_y": "49.12678094198271"
                }, 
                {
                    "id": "590101-590102",
                    "name": "Survilliers-Fosses",
                    "pos_x": "2.525531713983826",
                    "pos_y": "49.09958694009281"
                }, 
                {
                    "id": "590103-590104",
                    "name": "Louvres",
                    "pos_x": "2.501758065837831",
                    "pos_y": "49.049325601784794"
                }, 
                {
                    "id": "590105-590106",
                    "name": "Les Noues",
                    "pos_x": "2.478033366491636",
                    "pos_y": "49.03318276813804"
                }, 
                {
                    "id": "590107-590108",
                    "name": "Goussainville",
                    "pos_x": "2.462168964768089",
                    "pos_y": "49.023161999024914"
                }, 
                {
                    "id": "590109-590110",
                    "name": "Villiers-le-Bel (Gonesse - Arnouville)",
                    "pos_x": "2.416187488926984",
                    "pos_y": "48.99377714689271"
                }, 
                {
                    "id": "590111-590112",
                    "name": "Garges-Sarcelles",
                    "pos_x": "2.39059365127582",
                    "pos_y": "48.97674784828698"
                }, 
                {
                    "id": "590113-590114",
                    "name": "Pierrefitte Stains",
                    "pos_x": "2.372103138402569",
                    "pos_y": "48.96375542962029"
                }, 
                {
                    "id": "590115-590116",
                    "name": "Saint-Denis",
                    "pos_x": "2.345604378196291",
                    "pos_y": "48.93445554506131"
                }, 
                {
                    "id": "590117-590118",
                    "name": "Stade de France-Saint-Denis",
                    "pos_x": "2.350389537900993",
                    "pos_y": "48.917567175685384"
                }, 
                {
                    "id": "590119-590120",
                    "name": "Gare du Nord",
                    "pos_x": "2.357115334947971",
                    "pos_y": "48.88076895833307"
                }, 
                {
                    "id": "590121-590122",
                    "name": "Chatelet-Les Halles",
                    "pos_x": "2.347012687216214",
                    "pos_y": "48.86182227459668"
                }, 
                {
                    "id": "590123-590124",
                    "name": "Gare de Lyon (Banlieue)",
                    "pos_x": "2.373916471169029",
                    "pos_y": "48.8437725768586"
                }, 
                {
                    "id": "590125-590126",
                    "name": "Maisons-Alfort Alfortville",
                    "pos_x": "2.426482408484048",
                    "pos_y": "48.80204938032392"
                }, 
                {
                    "id": "590127-590128",
                    "name": "Le Vert de Maisons",
                    "pos_x": "2.432070117953792",
                    "pos_y": "48.78891489669564"
                }, 
                {
                    "id": "4473202-",
                    "name": "Creteil-Pompadour",
                    "pos_x": "2.435306339706323",
                    "pos_y": "48.771266038121055"
                }, 
                {
                    "id": "590131-590132",
                    "name": "Villeneuve-Triage",
                    "pos_x": "2.438344239163614",
                    "pos_y": "48.745230819408114"
                }, 
                {
                    "id": "590133-590134",
                    "name": "Villeneuve-Saint-Georges",
                    "pos_x": "2.446135830934545",
                    "pos_y": "48.73011683142026"
                }, 
                {
                    "id": "590135-590136",
                    "name": "Vigneux-sur-Seine",
                    "pos_x": "2.414358879800508",
                    "pos_y": "48.7083664325953"
                }, 
                {
                    "id": "590137-590138",
                    "name": "Juvisy-sur-Orge",
                    "pos_x": "2.382757203082266",
                    "pos_y": "48.68969793365298"
                }, 
                {
                    "id": "590139-590140",
                    "name": "Viry-Chatillon",
                    "pos_x": "2.386783797033431",
                    "pos_y": "48.676092433958715"
                }, 
                {
                    "id": "590141-590142",
                    "name": "Grigny-Centre",
                    "pos_x": "2.396176812439178",
                    "pos_y": "48.65396975928158"
                }, 
                {
                    "id": "590143-590144",
                    "name": "Orangis Bois de l'Epine",
                    "pos_x": "2.407796287520861",
                    "pos_y": "48.63635136800817"
                }, 
                {
                    "id": "590145-590146",
                    "name": "Evry Courcouronnes",
                    "pos_x": "2.428738987347718",
                    "pos_y": "48.62602242806499"
                }, 
                {
                    "id": "590147-590148",
                    "name": "Le Bras-de-Fer",
                    "pos_x": "2.451409095593275",
                    "pos_y": "48.62333224107223"
                }, 
                {
                    "id": "1988701-1988702",
                    "name": "Ris-Orangis",
                    "pos_x": "2.415206839972445",
                    "pos_y": "48.6589754238234"
                }, 
                {
                    "id": "1988703-1988704",
                    "name": "Grand-Bourg",
                    "pos_x": "2.435330531548363",
                    "pos_y": "48.64848911169394"
                }, 
                {
                    "id": "1988705-1988706",
                    "name": "Evry Val de Seine",
                    "pos_x": "2.452289892538954",
                    "pos_y": "48.63447902331143"
                }, 
                {
                    "id": "590149-",
                    "name": "Corbeil-Essonnes",
                    "pos_x": "2.472933649102297",
                    "pos_y": "48.61342791358873"
                }, 
                {
                    "id": "590151-590152",
                    "name": "Essonnes-Robinson",
                    "pos_x": "2.462456492779697",
                    "pos_y": "48.60555582637839"
                }, 
                {
                    "id": "590153-590154",
                    "name": "Villabe",
                    "pos_x": "2.461806388842185",
                    "pos_y": "48.59262774128592"
                }, 
                {
                    "id": "590155-590156",
                    "name": "Le Plessis-Chenet-IBM",
                    "pos_x": "2.479469169610713",
                    "pos_y": "48.57380779265948"
                }, 
                {
                    "id": "590157-590158",
                    "name": "Coudray-Montceaux",
                    "pos_x": "2.492713004236903",
                    "pos_y": "48.566117820741994"
                }, 
                {
                    "id": "590159-590160",
                    "name": "Saint-Fargeau",
                    "pos_x": "2.542651822724329",
                    "pos_y": "48.564485869218345"
                }, 
                {
                    "id": "590161-590162",
                    "name": "Ponthierry Pringy",
                    "pos_x": "2.544348951730932",
                    "pos_y": "48.53513976609529"
                }, 
                {
                    "id": "590163-590164",
                    "name": "Boissise-le-Roi",
                    "pos_x": "2.572073661381349",
                    "pos_y": "48.52974691857158"
                }, 
                {
                    "id": "590165-590166",
                    "name": "Vosves",
                    "pos_x": "2.599304265926134",
                    "pos_y": "48.51515145324159"
                }, 
                {
                    "id": "590167-590168",
                    "name": "Melun",
                    "pos_x": "2.654990284856376",
                    "pos_y": "48.52724332056844"
                }, 
                {
                    "id": "590149-590150",
                    "name": "Corbeil-Essonnes",
                    "pos_x": "2.472933649102297",
                    "pos_y": "48.61342791358873"
                }, 
                {
                    "id": "-4473203",
                    "name": "Creteil-Pompadour",
                    "pos_x": "2.435306339706323",
                    "pos_y": "48.771266038121055"
                }]
        }, 
        {
            "line": "E",
            "color": "#D683B1",
            "id": "264000",
            "stations": [
                {
                    "id": "5740951-5740952",
                    "name": "Gare de l'Est",
                    "pos_x": "2.359456616944207",
                    "pos_y": "48.877375619879636"
                }, 
                {
                    "id": "5005183-5005184",
                    "name": "Haussmann-Saint-Lazare",
                    "pos_x": "2.326717840220577",
                    "pos_y": "48.87502934185029"
                }, 
                {
                    "id": "5005185-5005186",
                    "name": "Magenta",
                    "pos_x": "2.358833236973676",
                    "pos_y": "48.8809135283548"
                }, 
                {
                    "id": "5740949-5740950",
                    "name": "Rosa Parks",
                    "pos_x": "2.37412297552969",
                    "pos_y": "48.89667381116845"
                }, 
                {
                    "id": "5005189-5005190",
                    "name": "Pantin",
                    "pos_x": "2.400361705897446",
                    "pos_y": "48.898112305394775"
                }, 
                {
                    "id": "5005191-5005192",
                    "name": "Noisy-le-Sec",
                    "pos_x": "2.458363410652067",
                    "pos_y": "48.896652451137925"
                }, 
                {
                    "id": "5005193-5005194",
                    "name": "Bondy",
                    "pos_x": "2.479793329961401",
                    "pos_y": "48.89401251501928"
                }, 
                {
                    "id": "5005195-5005196",
                    "name": "Le Raincy Villemomble Montfermeil",
                    "pos_x": "2.512566826933837",
                    "pos_y": "48.88907659292931"
                }, 
                {
                    "id": "5005197-5005198",
                    "name": "Gagny",
                    "pos_x": "2.525434250765843",
                    "pos_y": "48.88373428097723"
                }, 
                {
                    "id": "5005380-5005518",
                    "name": "Le Chenay Gagny",
                    "pos_x": "2.552881649788553",
                    "pos_y": "48.87715783880347"
                }, 
                {
                    "id": "5005519-5005520",
                    "name": "Chelles Gournay",
                    "pos_x": "2.583331160781805",
                    "pos_y": "48.87414408302407"
                }, 
                {
                    "id": "5005521-5005522",
                    "name": "Rosny-Bois-Perrier",
                    "pos_x": "2.481421258708739",
                    "pos_y": "48.882304004855996"
                }, 
                {
                    "id": "5005523-5005524",
                    "name": "Rosny-sous-Bois",
                    "pos_x": "2.485761141966139",
                    "pos_y": "48.86991242009122"
                }, 
                {
                    "id": "5005525-5005526",
                    "name": "Val de Fontenay",
                    "pos_x": "2.488187575181283",
                    "pos_y": "48.85379557653647"
                }, 
                {
                    "id": "5005527-5005528",
                    "name": "Nogent Le-Perreux",
                    "pos_x": "2.49418805536357",
                    "pos_y": "48.83934193738164"
                }, 
                {
                    "id": "5005529-5005530",
                    "name": "Les Boullereaux Champigny",
                    "pos_x": "2.511855552089056",
                    "pos_y": "48.82484856949333"
                }, 
                {
                    "id": "5005531-5005532",
                    "name": "Villiers-sur-Marne Plessis-Trevise",
                    "pos_x": "2.542679795377867",
                    "pos_y": "48.82326663412928"
                }, 
                {
                    "id": "5005533-5005534",
                    "name": "Les Yvris Noisy-le-Grand",
                    "pos_x": "2.579837255273694",
                    "pos_y": "48.82315185583908"
                }, 
                {
                    "id": "5005665-5005666",
                    "name": "Emerainville Pontault-Combault",
                    "pos_x": "2.619395778989611",
                    "pos_y": "48.805770376009484"
                }, 
                {
                    "id": "5005667-5005668",
                    "name": "Roissy-en-Brie",
                    "pos_x": "2.650387667079847",
                    "pos_y": "48.79565482140809"
                }, 
                {
                    "id": "5005669-5005670",
                    "name": "Ozoir-la-Ferriere",
                    "pos_x": "2.690252780824528",
                    "pos_y": "48.77077891885494"
                }, 
                {
                    "id": "5005671-5005672",
                    "name": "Gretz-Armainvilliers",
                    "pos_x": "2.727229371429766",
                    "pos_y": "48.746452320704556"
                }, 
                {
                    "id": "5005673-5005674",
                    "name": "Tournan",
                    "pos_x": "2.758824548674894",
                    "pos_y": "48.73948720730179"
                }]
        }, 
        {
            "line": "C",
            "color": "#F9D600",
            "id": "1031",
            "stations": [
                {
                    "id": "46297-46809",
                    "name": "Champ de Mars-Tour Eiffel",
                    "pos_x": "2.290391553460649",
                    "pos_y": "48.857293413870465"
                }, 
                {
                    "id": "46298-46810",
                    "name": "Pont de l'alma",
                    "pos_x": "2.300989969386769",
                    "pos_y": "48.86266245169434"
                }, 
                {
                    "id": "46450-46962",
                    "name": "Invalides",
                    "pos_x": "2.313911078538979",
                    "pos_y": "48.86290189176217"
                }, 
                {
                    "id": "46534-47046",
                    "name": "Musee d'Orsay",
                    "pos_x": "2.325620298752375",
                    "pos_y": "48.860708229865644"
                }, 
                {
                    "id": "46299-46811",
                    "name": "Saint-Michel Notre-Dame",
                    "pos_x": "2.346034984443716",
                    "pos_y": "48.85333579648197"
                }, 
                {
                    "id": "46300-46812",
                    "name": "Gare d'Austerlitz",
                    "pos_x": "2.365433384726205",
                    "pos_y": "48.842528026791484"
                }, 
                {
                    "id": "46301-46813",
                    "name": "Bibliotheque-Francois Mitterrand",
                    "pos_x": "2.376695892136014",
                    "pos_y": "48.82987504370409"
                }, 
                {
                    "id": "46302-46814",
                    "name": "Ivry-sur-Seine",
                    "pos_x": "2.391686971662538",
                    "pos_y": "48.813989052009454"
                }, 
                {
                    "id": "46303-46815",
                    "name": "Vitry-sur-Seine",
                    "pos_x": "2.402712818542927",
                    "pos_y": "48.800209398351384"
                }, 
                {
                    "id": "46304-46816",
                    "name": "Les Ardoines",
                    "pos_x": "2.409541655099439",
                    "pos_y": "48.7825054354935"
                }, 
                {
                    "id": "46489-47001",
                    "name": "Choisy-le-Roi",
                    "pos_x": "2.411386724936104",
                    "pos_y": "48.76378680955171"
                }, 
                {
                    "id": "46305-46817",
                    "name": "Les Saules",
                    "pos_x": "2.417520977896491",
                    "pos_y": "48.745072166893884"
                }, 
                {
                    "id": "46451-46963",
                    "name": "Orly-Ville",
                    "pos_x": "2.40290860736794",
                    "pos_y": "48.74187870567889"
                }, 
                {
                    "id": "46306-46818",
                    "name": "Pont de Rungis Aeroport d'Orly",
                    "pos_x": "2.373111940704935",
                    "pos_y": "48.74834968236464"
                }, 
                {
                    "id": "46307-46819",
                    "name": "Rungis-La Fraternelle",
                    "pos_x": "2.351633199531735",
                    "pos_y": "48.74019544821015"
                }, 
                {
                    "id": "46308-46820",
                    "name": "Chemin d'Antony",
                    "pos_x": "2.312711013515798",
                    "pos_y": "48.747941901886946"
                }, 
                {
                    "id": "46309-46821",
                    "name": "Massy-Verrieres",
                    "pos_x": "2.273483464396533",
                    "pos_y": "48.734716586800225"
                }, 
                {
                    "id": "46310-46822",
                    "name": "Massy-Palaiseau",
                    "pos_x": "2.257355188147784",
                    "pos_y": "48.725197641013786"
                }, 
                {
                    "id": "-46818",
                    "name": "Pont de Rungis Aeroport d'Orly",
                    "pos_x": "2.373111940704935",
                    "pos_y": "48.74834968236464"
                }]
        }, 
        {
            "line": "C",
            "color": "#F9D600",
            "id": "80928",
            "stations": [
                {
                    "id": "1664167-1664168",
                    "name": "Saint-Martin d'Etampes",
                    "pos_x": "2.145246592903116",
                    "pos_y": "48.42736258418355"
                }, 
                {
                    "id": "1664169-1664170",
                    "name": "Etampes",
                    "pos_x": "2.159530587565154",
                    "pos_y": "48.436923937640294"
                }, 
                {
                    "id": "1664171-1664172",
                    "name": "Etrechy",
                    "pos_x": "2.194581699172116",
                    "pos_y": "48.493644578487505"
                }, 
                {
                    "id": "1664173-1664174",
                    "name": "Chamarande",
                    "pos_x": "2.215517810582092",
                    "pos_y": "48.51424587619093"
                }, 
                {
                    "id": "1664175-1664176",
                    "name": "Lardy",
                    "pos_x": "2.254739701073405",
                    "pos_y": "48.52040359106149"
                }, 
                {
                    "id": "1664177-1664178",
                    "name": "Bouray",
                    "pos_x": "2.290082513828219",
                    "pos_y": "48.53289010414424"
                }, 
                {
                    "id": "1664179-1664180",
                    "name": "Marolles-en-Hurepoix",
                    "pos_x": "2.290924469845003",
                    "pos_y": "48.56559386282989"
                }, 
                {
                    "id": "1664181-1664182",
                    "name": "Bretigny-sur-Orge",
                    "pos_x": "2.302059694247387",
                    "pos_y": "48.60674495256192"
                }, 
                {
                    "id": "1664183-1664184",
                    "name": "Saint-Michel-sur-Orge",
                    "pos_x": "2.306833164002912",
                    "pos_y": "48.635875862238876"
                }, 
                {
                    "id": "1664185-1664186",
                    "name": "Sainte-Genevieve-des-Bois",
                    "pos_x": "2.312736251060262",
                    "pos_y": "48.65281140144265"
                }, 
                {
                    "id": "1664187-1664188",
                    "name": "Epinay-sur-Orge",
                    "pos_x": "2.332622929198995",
                    "pos_y": "48.669483726107565"
                }, 
                {
                    "id": "1664189-1664190",
                    "name": "Savigny-sur-Orge",
                    "pos_x": "2.352481401048998",
                    "pos_y": "48.676446656997726"
                }, 
                {
                    "id": "1664191-1664192",
                    "name": "Juvisy-sur-Orge",
                    "pos_x": "2.382757203082266",
                    "pos_y": "48.68969793365298"
                }, 
                {
                    "id": "1664193-1664194",
                    "name": "Bibliotheque-Francois Mitterrand",
                    "pos_x": "2.376695892136014",
                    "pos_y": "48.82987504370409"
                }, 
                {
                    "id": "1664195-1664196",
                    "name": "Gare d'Austerlitz",
                    "pos_x": "2.365433384726205",
                    "pos_y": "48.842528026791484"
                }, 
                {
                    "id": "1664197-1664198",
                    "name": "Saint-Michel Notre-Dame",
                    "pos_x": "2.346034984443716",
                    "pos_y": "48.85333579648197"
                }, 
                {
                    "id": "1664199-1664200",
                    "name": "Musee d'Orsay",
                    "pos_x": "2.325620298752375",
                    "pos_y": "48.860708229865644"
                }, 
                {
                    "id": "1664201-1664202",
                    "name": "Invalides",
                    "pos_x": "2.313911078538979",
                    "pos_y": "48.86290189176217"
                }, 
                {
                    "id": "1664203-1664204",
                    "name": "Pont de l'alma",
                    "pos_x": "2.300989969386769",
                    "pos_y": "48.86266245169434"
                }, 
                {
                    "id": "1664205-1664206",
                    "name": "Champ de Mars-Tour Eiffel",
                    "pos_x": "2.290391553460649",
                    "pos_y": "48.857293413870465"
                }, 
                {
                    "id": "1664207-1664208",
                    "name": "Kennedy Radio-France",
                    "pos_x": "2.279487064975001",
                    "pos_y": "48.85364805626964"
                }, 
                {
                    "id": "1664209-1664210",
                    "name": "Boulainvilliers",
                    "pos_x": "2.27516715468514",
                    "pos_y": "48.8565315515406"
                }, 
                {
                    "id": "1664211-1664212",
                    "name": "Avenue Henri-Martin",
                    "pos_x": "2.272120621636198",
                    "pos_y": "48.864461748379675"
                }, 
                {
                    "id": "1664213-1664214",
                    "name": "Avenue Foch",
                    "pos_x": "2.275574526847743",
                    "pos_y": "48.870974138193766"
                }, 
                {
                    "id": "1664215-1664216",
                    "name": "Porte Maillot",
                    "pos_x": "2.284431219916768",
                    "pos_y": "48.87790843816007"
                }, 
                {
                    "id": "1664217-1664218",
                    "name": "Pereire",
                    "pos_x": "2.298033303213241",
                    "pos_y": "48.88540428091779"
                }, 
                {
                    "id": "1664219-1664227",
                    "name": "Porte de Clichy",
                    "pos_x": "2.315599220546768",
                    "pos_y": "48.89416838621195"
                }, 
                {
                    "id": "1664244-1664252",
                    "name": "Saint-Ouen",
                    "pos_x": "2.322400403154985",
                    "pos_y": "48.90565495492737"
                }, 
                {
                    "id": "1664268-1664280",
                    "name": "Les Gresillons",
                    "pos_x": "2.313835382469576",
                    "pos_y": "48.92087280345732"
                }, 
                {
                    "id": "1664291-1664292",
                    "name": "Gennevilliers",
                    "pos_x": "2.30794323408686",
                    "pos_y": "48.932896165549444"
                }, 
                {
                    "id": "1664293-1664294",
                    "name": "Epinay-sur-Seine",
                    "pos_x": "2.30234042019572",
                    "pos_y": "48.95339646167632"
                }, 
                {
                    "id": "1664300-1664308",
                    "name": "Saint-Gratien",
                    "pos_x": "2.285930718208942",
                    "pos_y": "48.96358968487314"
                }, 
                {
                    "id": "1664322-1664331",
                    "name": "Ermont-Eaubonne",
                    "pos_x": "2.272084772747633",
                    "pos_y": "48.980646100425986"
                }, 
                {
                    "id": "1664332-1664333",
                    "name": "Cernay",
                    "pos_x": "2.257474158629373",
                    "pos_y": "48.985004700368414"
                }, 
                {
                    "id": "1664344-1664352",
                    "name": "Franconville Plessis-Bouchard",
                    "pos_x": "2.234276393983286",
                    "pos_y": "48.993713481284985"
                }, 
                {
                    "id": "1664366-1664367",
                    "name": "Montigny-Beauchamp",
                    "pos_x": "2.197619813968745",
                    "pos_y": "49.00742329713069"
                }, 
                {
                    "id": "2855045-2855046",
                    "name": "Gare d'Austerlitz Grandes Lignes",
                    "pos_x": "2.365433384726205",
                    "pos_y": "48.842528026791484"
                }]
        }
    ]}

    return static_data
}
