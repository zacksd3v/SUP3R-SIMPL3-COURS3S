class Car {
    #brand; // Private property  // Exercise 17f
    #model; // Private property
    // Exercise 17c
    speed = 0;
    // Exercise 17d
    isTrunkOpen = false;
    
    constructor(carDetails) {
        this.#brand = carDetails.brand;
        this.#model = carDetails.model;
    }

    // GETTERS: Don ba wa Child Class damar karanta sunayen
    get brand() {
        return this.#brand;
    }
    get model() {
        return this.#model;
    }

    // Exercise 17b
    displayInfo() {
        const trunkStatus = this.isTrunkOpen ? 'open' : 'closed';
        console.log(`${this.#brand} ${this.#model}`);
        console.log(`${this.#brand} ${this.#model} ${this.speed} km/h  Trunk: ${trunkStatus}`);
    }

    go() {
        // Gyara: Mota bai kamata ta bude akwati (trunk) da kanta idan tana gudu ba!
        // Idan akwati a bude yake, mota ba zata tashi ba, ko kuma idan tana gudu akwati a rufe yake.
        if (!this.isTrunkOpen) {
            this.speed += 5;
        } else {
            console.log("Cannot drive with an open trunk!");
        }

        if (this.speed > 200 ) {
            this.speed = 200;
        }
    }

    break() {
        this.speed -= 5;
        if (this.speed < 0) {
            this.speed = 0;
        }
    }

    openTrunk() {
        // Kada a bude akwati idan mota tana gudu
        if (this.speed === 0) {
            this.isTrunkOpen = true;
        } else {
            console.log("Cannot open trunk while driving!");
        }
    }

    closeTrunk() {
        this.isTrunkOpen = false;
    }
}

// INHERITANCE
class RaceCar extends Car {
    speed = 0; // Motar tsere ma tana farawa daga 0
    acceleration;

    constructor(carDetails) {
        super(carDetails);
        this.acceleration = carDetails.acceleration;
        // Mun bar maganar 'delete' tunda bamu bukace ta ba nan
    }

    // Anan 'this.brand' zai yi aiki saboda akwai 'get brand()' a sama
    displayInfo() {
        console.log(`${this.brand} ${this.model}`);
        console.log(`${this.brand} ${this.model} ${this.speed} km/h`);
    }

    go() {
        this.speed += this.acceleration;
        if (this.speed > 300) {
            this.speed = 300;
        }
    }

    openTrunk() {
        console.log('Racing Car Does Not Have A Trunk');
    }

    closeTrunk() {
        console.log('Racing Car Does Not Have A Trunk');
    }
}

// ---> GWADAWA <---
const raceCar1 = new RaceCar({
    brand: 'McLaren',
    model: 'F1',
    acceleration: 20
});

// console.log('---- EXERCISE 17 -----');
// raceCar1.go();
// raceCar1.displayInfo(); // Zai fito da: McLaren F1 \n McLaren F1 20 km/h