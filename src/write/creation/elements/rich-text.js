function richText(rows, str, defFont, klass, name, paddingLeft, attr, getTextSize) {
	var space = getTextSize.calc("i", defFont, klass);
	if (str === '') {
		rows.push({ move: space.height });
	} else {
		if (typeof str === 'string') {
			str = [{text: str}]
		}
		var largestY = 0;
		var gap = 0;
		var row = {
			klass: klass,
			left: paddingLeft,
			anchor: attr.anchor,
			phrases: []
		}
		rows.push(row)
		for (var k = 0; k < str.length; k++) {
			var thisWord = str[k];
			var font = (thisWord.font) ? thisWord.font : getTextSize.attr(defFont, klass).font;
			var phrase = {
				content: thisWord.text,
			}
			if (font)
				phrase.attrs = {
					"font-family": getTextSize.getFamily(font.face),
					"font-size": font.size,
					"font-weight": font.weight,
					"font-style": font.style,
					"font-decoration": font.decoration,
			}
			//if (thisWord.text) {
				row.phrases.push(phrase);
				var size = getTextSize.calc(thisWord.text, font, klass);
				largestY = Math.max(largestY, size.height);
				if (thisWord.text[thisWord.text.length - 1] === ' ') {
					gap = space.width
				}
		}
		rows.push({ move: largestY });
	}
}

module.exports = richText;
