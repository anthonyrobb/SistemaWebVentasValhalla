import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '@angular/common';

interface Totales {
  yape: number;
  efectivo: number;
  tarjeta: number;
}

@Component({
  selector: 'app-caja',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css']
})
export class CajaComponent implements OnInit {
  fechaActual: Date = new Date();
  totales: Totales = {
    yape: 150.50,
    efectivo: 300.75,
    tarjeta: 250.25
  };

  ngOnInit(): void {
    this.calcularTotalGeneral();
  }

  get totalGeneral(): number {
    return this.totales.yape + this.totales.efectivo + this.totales.tarjeta;
  }

  refreshReporte(): void {
    this.totales = {
      yape: Math.random() * 200,
      efectivo: Math.random() * 400,
      tarjeta: Math.random() * 300
    };
    this.calcularTotalGeneral();
  }

  private calcularTotalGeneral(): void {
    // Este método se ejecuta automáticamente con el getter
  }
}