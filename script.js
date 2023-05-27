class RangeDuplo {
    constructor(sldMin, sldMax, txtMin, txtMax) {
        this.corSlider = '#eee';
        this.corRange = '#5496ba';
        this.sldMin = $(sldMin);
        this.sldMax = $(sldMax);
        this.txtMin = $(txtMin);
        this.txtMax = $(txtMax);

        this.sldMin.on('input', () => {
            const [min, max] = this.valores(this.sldMin, this.sldMax);
            if (min > max) {
                this.sldMax.val(min);
                this.txtMax.val(min);
                this.txtMin.val(min);
            } else {
                this.txtMin.val(min);
            }
            this.preencher();
        });

        this.sldMax.on('input', () => {
            const [min, max] = this.valores(this.sldMin, this.sldMax);
            if (max < min) {
                this.sldMin.val(max);
                this.txtMin.val(max);
                this.txtMax.val(max);
            } else {
                this.txtMax.val(max);
            }
            this.preencher();
        });

        this.txtMin.on('blur', () => {
            const [min, max] = this.valores(this.txtMin, this.txtMax);
            if (min > max) {
                this.txtMax.val(min);
                this.sldMax.val(min);
                this.sldMin.val(min);
            } else {
                this.sldMin.val(min);
            }
            this.preencher();
        });

        this.txtMax.on('blur', () => {
            const [min, max] = this.valores(this.txtMin, this.txtMax);
            if (max < min) {
                this.txtMin.val(max);
                this.sldMin.val(max);
                this.sldMax.val(max);
            } else {
                this.sldMax.val(max);
            }
            this.preencher();
        });
        this.preencher();
    }

    valores(min, max) {
        const minimo = parseInt(min.val().replace(',', '.') * 100, 10) / 100;
        const maximo = parseInt(max.val().replace(',', '.') * 100, 10) / 100;
        return [minimo, maximo];
    }

    preencher() {
        const distancia = this.sldMax.attr('max') - this.sldMax.attr('min');
        const posicaoOrig = this.sldMin.val() - this.sldMin.attr('min');
        const posicaoDest = this.sldMax.val() - this.sldMax.attr('min');
        this.sldMin.css(
            'background',
            `linear-gradient(
        to right,
        ${this.corSlider} 0%,
        ${this.corSlider} ${(posicaoOrig / distancia) * 100}%,
        ${this.corRange}  ${(posicaoOrig / distancia) * 100}%,
        ${this.corRange}  ${(posicaoDest / distancia) * 100}%, 
        ${this.corSlider} ${(posicaoDest / distancia) * 100}%, 
        ${this.corSlider} 100%)`
        );
    }
}

new RangeDuplo('#sldMin', '#sldMax', '#txtMin', '#txtMax');
