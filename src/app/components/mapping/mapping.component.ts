import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import * as L from 'leaflet';
interface Request {
  street: string,
  customerFirstName: string,
  description: string,
  houseNumber: string,
  postCode: string
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
    street: 'Cuxhavener Strasse',
    houseNumber: '335',
    postCode: '21149',
    customerFirstName: 'Sabine Krause',
    description: 'Sicherung im Sicherungskasten löst regelmäßig aus'
  },
  {
    street: 'Reeperbahn',
    houseNumber: '23',
    postCode: '20359',
    customerFirstName: 'Tobias Möller',
    description: 'Bewegungsmelder an der Haustür funktioniert nicht'
  },
  {
    street: 'Jungfernstieg',
    houseNumber: '16',
    postCode: '20354',
    customerFirstName: 'Lena Schneider',
    description: 'LED-Spots in der Decke flackern'
  },
  {
    street: 'Wandsbeker Chaussee',
    houseNumber: '187',
    postCode: '22089',
    customerFirstName: 'Khalid Yilmaz',
    description: 'Internetrouter erhält keinen Strom'
  },
  {
    street: 'Schulterblatt',
    houseNumber: '73',
    postCode: '20357',
    customerFirstName: 'Annika Weber',
    description: 'Steckdose in der Küche ist ohne Funktion'
  },
  {
    street: 'Mönckebergstraße',
    houseNumber: '7',
    postCode: '20095',
    customerFirstName: 'Jan Petersen',
    description: 'Türsprechanlage defekt'
  },
  {
    street: 'Alsterdorfer Straße',
    houseNumber: '300',
    postCode: '22297',
    customerFirstName: 'Miriam Lange',
    description: 'Sicherungen wurden nach Umbau nicht richtig beschriftet'
  },
  {
    street: 'Osterstraße',
    houseNumber: '112',
    postCode: '20259',
    customerFirstName: 'Paul Berger',
    description: 'Beleuchtung im Badezimmer fällt aus'
  },
  {
    street: 'Steinstraße',
    houseNumber: '12',
    postCode: '20095',
    customerFirstName: 'Emre Demir',
    description: 'Kurzschluss in der Außenbeleuchtung'
  },
  {
    street: 'Billstedter Hauptstraße',
    houseNumber: '45',
    postCode: '22111',
    customerFirstName: 'Claudia Schröder',
    description: 'Klingelanlage ohne Funktion'
  }
];


@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.css']
})

export class MappingComponent implements OnInit, AfterViewInit, AfterViewChecked {
  private BACKEND_URL = "http://localhost:8080/requests/getAllRequests"
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
    const fetchedRequests: Request[] = await this.fetchRequestsFromBackend()
    //TODO: Change mockHamburgRequests to fetchRequests
    const markerPromises = fetchedRequests.map(request => this.translateStreetToCoordinates(request));
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
      const res = await fetch(`https://nominatim.openstreetmap.org/search?city=hamburg&street=${request.street}&postalcode=${request.postCode}&country=germany&format=geojson`);
      const data = await res.json();

      if (data && data.features[0]?.geometry.coordinates) {
        const coords = data.features[0].geometry.coordinates.reverse();
        return L.marker(coords, { icon: buildIcon }).bindPopup(`<p>${request.customerFirstName}, ${request.description}</p>`);

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
