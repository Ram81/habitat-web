// Copyright (c) Facebook, Inc. and its affiliates.
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

/**
 * Inventory class
 */
class Inventory {
  // PUBLIC methods.

  /**
   * Create inverntory.
   * @param {number} inventorySlots - inventory size
   */
  constructor(inventorySlots) {
    this.inventorySlots = inventorySlots;
    this.inventory = new Array(inventorySlots);
    this.inventoryComponent = null;
    this.inventoryEnabled = false;
    this.inventoryCtx = null;
  }

  reset() {
    this.inventory = new Array(this.inventorySlots);
  }

  initInventory(component) {
    this.inventoryComponent = component;
    this.inventoryEnabled = true;
    this.inventoryCtx = component.getContext("2d");
  }

  setSlot(index, value) {
    this.inventory[index] = value;
  }

  getSlot(index) {
    return this.inventory[index];
  }

  getEmptySlot() {
    for (let index = 0; index < this.inventorySlots; index++) {
      if (this.inventory[index] === undefined) {
        return index;
      }
    }
    return -1;
  }

  findObjectSlot(objectId) {
    for (let index = 0; index < this.inventorySlots; index++) {
      if (
        this.inventory[index] !== undefined &&
        this.inventory[index]["objectId"] === objectId
      ) {
        return index;
      }
    }
    return -1;
  }

  renderInventory() {
    if (!this.inventoryEnabled) {
      return;
    }

    const height = 80;
    const padding = 2;
    const width = height * this.inventorySlots;

    if (this.inventoryComponent.style.border === "") {
      this.inventoryComponent.style.border = "5px solid #000000";
      this.inventoryComponent.width = width.toString();
    }

    let ctx = this.inventoryCtx;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "darkslategray";
    const boxSize = height - padding * 2;
    for (let i = 0; i < this.inventorySlots; ++i) {
      // draw box
      const boxOffset = padding + i * (boxSize + padding);
      ctx.beginPath();
      ctx.strokeStyle = "grey";
      ctx.lineWidth = 5;
      ctx.rect(boxOffset, padding, boxSize, boxSize);
      ctx.stroke();
      ctx.closePath();

      const imgSize = boxSize - padding * 2;
      if (this.inventory[i] !== undefined) {
        let img = new Image();
        img.src = this.inventory[i]["objectIcon"];
        img.addEventListener("load", () => {
          ctx.drawImage(
            img,
            boxOffset + padding,
            padding * 2,
            imgSize,
            imgSize
          );
        });
      }
    }
  }
}

export default Inventory;
