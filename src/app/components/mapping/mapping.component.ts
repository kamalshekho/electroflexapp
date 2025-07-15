import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import * as L from 'leaflet';
interface Request {
  streetName: string,
  customerName: string,
  issueDescription: string,
  number: string,
  postal_code: string
}
let buildIcon = L.icon({
  iconUrl: 'images/build-icon-half.png',

  iconSize:     [82, 74],
  iconAnchor:   [37, 82],
  shadowAnchor: [4, 62],
  popupAnchor:  [-3, -76]
});
const mockHamburgRequests: Request[] = [
  {
    streetName: 'Cuxhavener Strasse',
    number: '335',
    postal_code: '21149',
    customerName: 'Sabine Krause',
    issueDescription: 'Sicherung im Sicherungskasten löst regelmäßig aus'
  },
  {
    streetName: 'Reeperbahn',
    number: '23',
    postal_code: '20359',
    customerName: 'Tobias Möller',
    issueDescription: 'Bewegungsmelder an der Haustür funktioniert nicht'
  },
  {
    streetName: 'Jungfernstieg',
    number: '16',
    postal_code: '20354',
    customerName: 'Lena Schneider',
    issueDescription: 'LED-Spots in der Decke flackern'
  },
  {
    streetName: 'Wandsbeker Chaussee',
    number: '187',
    postal_code: '22089',
    customerName: 'Khalid Yilmaz',
    issueDescription: 'Internetrouter erhält keinen Strom'
  },
  {
    streetName: 'Schulterblatt',
    number: '73',
    postal_code: '20357',
    customerName: 'Annika Weber',
    issueDescription: 'Steckdose in der Küche ist ohne Funktion'
  },
  {
    streetName: 'Mönckebergstraße',
    number: '7',
    postal_code: '20095',
    customerName: 'Jan Petersen',
    issueDescription: 'Türsprechanlage defekt'
  },
  {
    streetName: 'Alsterdorfer Straße',
    number: '300',
    postal_code: '22297',
    customerName: 'Miriam Lange',
    issueDescription: 'Sicherungen wurden nach Umbau nicht richtig beschriftet'
  },
  {
    streetName: 'Osterstraße',
    number: '112',
    postal_code: '20259',
    customerName: 'Paul Berger',
    issueDescription: 'Beleuchtung im Badezimmer fällt aus'
  },
  {
    streetName: 'Steinstraße',
    number: '12',
    postal_code: '20095',
    customerName: 'Emre Demir',
    issueDescription: 'Kurzschluss in der Außenbeleuchtung'
  },
  {
    streetName: 'Billstedter Hauptstraße',
    number: '45',
    postal_code: '22111',
    customerName: 'Claudia Schröder',
    issueDescription: 'Klingelanlage ohne Funktion'
  }
];


@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.css']
})

export class MappingComponent implements OnInit, AfterViewInit, AfterViewChecked {
  private BACKEND_URL = "http://localhost:8080/requests"
  private map!: L.Map
  markers: L.Marker[] = [
    L.marker([53.551086, 9.993682], { icon: buildIcon }).bindPopup("<p>Jack Sparrow, Klingelanlage funktioniert nicht</p>")
  ];

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
      this.initializeMap();
      this.addMarkers().then(() => {
        this.centerMap()
      });
  }

  ngAfterViewChecked() {

  }

  private async fetchRequestsFromBackend(){
    const requests = await fetch(this.BACKEND_URL)
    return await requests.json()
  }

  private initializeMap() {
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    this.map = L.map('map');
    L.tileLayer(baseMapURl).addTo(this.map);
  }

  private async addMarkers() {
    // const fetchRequests = await fetchRequestsFromBackend()
    //TODO: Change mockHamburgRequests to fetchRequests
    const markerPromises = mockHamburgRequests.map(request => this.translateStreetToCoordinates(request));
    const markers = await Promise.all(markerPromises);

    const loadingContainer = document.getElementById("loadingContainer")
    if (loadingContainer) {
      loadingContainer.classList.remove("loading")
      console.log("removed class loading from div")
    }

    markers.forEach(marker => {
      if (marker) {
        this.markers.push(marker);
        marker.addTo(this.map);
      }
    });

    console.log("All markers added to the map.");
  }

  private async translateStreetToCoordinates(request: Request): Promise<L.Marker | null> {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?city=hamburg&street=${request.streetName}&postalcode=${request.postal_code}&country=germany&format=geojson`);
      const data = await res.json();

      if (data && data.features[0]?.geometry.coordinates) {
        const coords = data.features[0].geometry.coordinates.reverse();
        return L.marker(coords, { icon: buildIcon }).bindPopup(`<p>${request.customerName}, ${request.issueDescription}</p>`);

      } else {
        console.log("Could not find a street with that name");
        return null;
      }
    } catch (error) {

      console.error("Error fetching coordinates:", error);
      return null;
    }
  }

  private centerMap() {
    const hamburgCenter = L.latLng(53.5511, 9.9937);
    this.map.setView(hamburgCenter, 11);
  }
}
