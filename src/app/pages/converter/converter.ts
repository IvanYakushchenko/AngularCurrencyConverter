import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExchangeService } from '../../service/exchange.service';


@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './converter.html',
  styleUrl: './converter.css',
})
export class ConverterComponent implements OnInit {
  currencies = ['USD', 'EUR', 'GBP', 'UAH', 'JPY'];
  fromCurrency = 'USD';
  toCurrency = 'UAH';
  amount = 1;
  resultText = '';
  rates: Record<string, number> = {};

  constructor(private exchangeService: ExchangeService) {}

  ngOnInit(): void {
    this.exchangeService.getRates().subscribe((data) => {
      this.rates = { ...data, UAH: 1 };
    });
  }


isModalOpen = false;


  convert() {
    if (!this.amount || this.amount <= 0 || !this.fromCurrency || !this.toCurrency) return;

    const fromRate = this.rates[this.fromCurrency];
    const toRate = this.rates[this.toCurrency];
    if (!fromRate || !toRate) return;

    const rate = fromRate / toRate;
    const converted = +(this.amount * rate).toFixed(2);
    this.resultText = `${this.amount} ${this.fromCurrency} = ${converted} ${this.toCurrency}`;

    const history = JSON.parse(localStorage.getItem('conversionHistory') || '[]');
    const newEntry = `${new Date().toLocaleString()}: ${this.resultText}`;
    localStorage.setItem('conversionHistory', JSON.stringify([newEntry, ...history]));

    const modal = document.getElementById('resultModal');
    if (modal) {
      const bsModal = new (window as any).bootstrap.Modal(modal);
      bsModal.show();
      document.body.classList.add('blurred-bg');
      modal.addEventListener('hidden.bs.modal', () => {
        document.body.classList.remove('blurred-bg');
      });
    }
  }
}