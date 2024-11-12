import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, StateKey, makeStateKey } from '@angular/core';
import { DataService } from '../../services/data.service';
import { TransferState } from '@angular/core';

const dataKey = makeStateKey('datosCompartidos');

@Component({
  selector: 'app-saludo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './saludo.component.html',
  styleUrl: './saludo.component.scss'
})
export class SaludoComponent implements OnInit {
  data!: any;
  dataKey: StateKey<string> = makeStateKey<string>('products');

  constructor(
    private dataService: DataService,
    @Inject(PLATFORM_ID) private platformID: Object, // Permite obtener en que lado se ejecuta el codigo. o Servidor o bien en el navegador
    private transferState: TransferState // Comunica lo que se desarrolla entre el lado del navegador y el lado servidor
  ) {

  }

  ngOnInit(): void {
    if (isPlatformServer(this.platformID)) { //Si corre en el servidor
      console.log('Este bloque sólo se ejecuta en el servidor');
      this.dataService.getProducts().subscribe((response: any) => { //En el lado del servidor llamamos a la api
        this.data = response;
        this.transferState.set(this.dataKey, this.data); // Transferimos desde lado servidor hacia el lado cliente
        console.log("desde el servidor",this.data);
      });
    } else if (isPlatformBrowser(this.platformID)) { //Si corre en el lado del cliente (navegador)
      console.log('Este bloque sólo se ejecuta en el navegador');
      this.data = this.transferState.get(this.dataKey, null);
      console.log("desde el cliente navegador",this.data);
    }
  }

}
