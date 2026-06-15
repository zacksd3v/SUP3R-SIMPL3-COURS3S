import { Product, Clothing, Appliance } from "../../Lesson13/1/javascript-amazon-project/data/products.js";

describe('Test Suite: Products Classes', () => {
  describe('Product Class Testing', () => {
    let product;

    beforeEach(() => {
      product = new Product({
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        image: "images/products/athletic-cotton-socks-6-pairs.jpg",
        name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
        rating: {
          stars: 4.5,
          count: 87
        },
        priceCents: 1090
      });
    });

    it('ya kamata ya mallaki dukkan asalin properties', () => {
      expect(product.id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
      expect(product.name).toEqual("Black and Gray Athletic Cotton Socks - 6 Pairs");
      expect(product.priceCents).toEqual(1090);
    });

    it('ya kamata ya canza priceCents zuwa format na kudi da ya dace', () => {
      // Tunda getPrice() yana amfani da formatMoney, yana da kyau mu duba idan ya fitar da $10.90
      expect(product.getPrice()).toEqual('$10.90');
    });

    it('ya kamata ya fitar da URL na hoton taurari (Rating Stars URL)', () => {
      expect(product.getStartsUrl()).toEqual('images/ratings/rating-45.png');
    });

    it('ya kamata ya bayar da fanko (empty string) ga extraInfoHtml()', () => {
      expect(product.extraInfoHtml()).toEqual('');
    });
  });

  // 2. Gwajin Gado na Tufafi (Clothing Class - Inheritance)
  describe('Clothing Class Testing', () => {
    let clothing;

    beforeEach(() => {
      clothing = new Clothing({
        id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
        image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
        name: "Adults Plain Cotton T-Shirt - 2 Pack",
        rating: { stars: 4.5, count: 56 },
        priceCents: 799,
        sizeChartLink: "images/clothing-size-chart.png"
      });
    });

    it('ya kamata ya gaji properties na Parent sannan ya hada da sizeChartLink', () => {
      expect(clothing.name).toEqual("Adults Plain Cotton T-Shirt - 2 Pack");
      expect(clothing.sizeChartLink).toEqual("images/clothing-size-chart.png");
    });

    it('ya kamata ya yi overriding na extraInfoHtml() don samar da Size Chart link', () => {
      expect(clothing.extraInfoHtml()).toContain('Size Chart');
      expect(clothing.extraInfoHtml()).toContain('images/clothing-size-chart.png');
    });
  });

  // 3. Gwajin Kayan Wuta (Appliance Class - Inheritance)
  describe('Appliance Class Testing', () => {
    let appliance;

    beforeEach(() => {
      appliance = new Appliance({
        id: "54e0eccd-8f36-462b-b68a-8182611d9add",
        image: "images/products/black-2-slot-toaster.jpg",
        name: "2 Slot Toaster - Black",
        rating: { stars: 5, count: 2197 },
        priceCents: 1899,
        instructionsLink: "images/appliance-instructions.png",
        warrantyLink: "images/appliance-warranty.png"
      });
    });

    it('ya kamata ya adana instructionsLink da warrantyLink yadda ya kamata', () => {
      expect(appliance.instructionsLink).toEqual("images/appliance-instructions.png");
      expect(appliance.warrantyLink).toEqual("images/appliance-warranty.png");
    });

    it('ya kamata ya nuna links na Instructions da Warranty a extraInfoHtml()', () => {
      const htmlOutput = appliance.extraInfoHtml();
      expect(htmlOutput).toContain('Instructions');
      expect(htmlOutput).toContain('Warranty');
      expect(htmlOutput).toContain('images/appliance-instructions.png');
    });
  });

});