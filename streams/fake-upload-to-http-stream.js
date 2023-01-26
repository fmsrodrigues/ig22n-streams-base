import { Readable } from "node:stream";

class OneToHundreadStream extends Readable {
  index = 1;
  
  _read() {
    const i = this.index++;

    setTimeout(() => {
      if(i > 10) {
        this.push(null);
      } else {
        const buf = Buffer.from(String(i));
  
        this.push(buf);
      }
    }, 250)
  }
}

fetch("http://localhost:3334", {
  method: "POST",
  body: new OneToHundreadStream(),
  duplex: "half"
})
  .then(res => res.text())
  .then(data => console.log(data))