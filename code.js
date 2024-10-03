// code.js

figma.showUI(__html__);

figma.on("selectionchange", () => {
  const selection = figma.currentPage.selection[0];

  if (selection && selection.type === "FRAME") {
    const textNodes = [];
    getTextNodes(selection, textNodes);

    const fontsUsed = new Set();
    textNodes.forEach(node => {
      fontsUsed.add(`${node.fontName.family} - ${node.fontName.style}`);
    });

    figma.ui.postMessage(Array.from(fontsUsed));
  }
});

function getTextNodes(node, textNodes) {
  if (node.type === "TEXT") {
    textNodes.push(node);
  } else if ("children" in node) {
    for (const child of node.children) {
      getTextNodes(child, textNodes);
    }
  }
}

figma.on("close", () => {
  figma.closePlugin();
});
