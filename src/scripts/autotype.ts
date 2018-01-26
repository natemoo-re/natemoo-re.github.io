export class Autotype {
    private el: HTMLElement;
    private text: string;
    private currentText: string = '';
    private rate: number = 150;
    private timer: any;

    constructor(el: HTMLElement, text: string) {
        this.el = el;
        this.text = text;
    }

    private randBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    private randInterval(fn: () => any, opts: { fuzz: number, loops: number } = { fuzz: 50, loops: this.text.length - 1 }): Promise<undefined> {
        return new Promise((resolve) => {
            let i = 0;
            (function loop() {
                let rate = this.randBetween(this.rate - opts.fuzz, this.rate + opts.fuzz);
                if (i < opts.loops) {
                    setTimeout(() => {
                        fn();
                        i++;
                        loop.bind(this)();
                    }, rate)
                } else {
                    return resolve();
                }
            }.bind(this)())
        });
    }

    private setText(length: number) {
        let text = [...this.text][length];
        if (text === undefined) {
            return;
        } else {
            this.currentText += text;
            this.el.innerText = this.currentText;
        }
    };

    play(): Promise<number> {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.setText(0);
                return resolve(this.randInterval(() => this.setText(this.currentText.length)));
            }, this.rate);
        });
    }
}