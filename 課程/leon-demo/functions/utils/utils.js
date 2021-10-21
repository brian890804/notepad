
module.exports = {
    getRandomId: function(length, widthDate, exclude)
    {
        var num = ['0','1','2','3','4','5','6','7','8','9'];
        var lowerCase = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
        var upperCase = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        var codes = [];
        codes = codes.concat(num);
        codes = codes.concat(lowerCase);
        codes = codes.concat(upperCase);

        if (exclude && exclude.length > 0) {
            for (var i = 0 ; i < exclude.length ; i++) {
                for (var j = 0 ; j < codes.length ; j++) {
                    if (codes[j] == exclude[i]) {
                        codes.splice(j, 1);
                        break;
                    }
                }
            }
        }

        var randomId = "";
        if (widthDate) {
            var curDate = new Date();
            var year = curDate.getFullYear();
            var month = curDate.getMonth() + 1;
            var day = curDate.getDate();

            randomId += year.toString();
            randomId += (month < 10 ? "0" : "") + month.toString();
            randomId += (day < 10 ?　"0" : "") + day.toString();
        }

        // length must be larger than 20
        length = length ? parseInt(length) : 20;
        length = length > 20 ? length : 20;
        length = length - randomId.length;
        for (var i = 0 ; i < length ; i++) {
            var index = Math.floor((Math.random() * codes.length) + 1) % codes.length;
            randomId += codes[index];
        }

        return randomId;
    },
    intFromBytes: function( x )
    {
        var val = 0;
        for (var i = 0; i < x.length; ++i) {        
            val += x[i];        
            if (i < x.length-1) {
                val = val << 8;
            }
        }
        return val;
    },
    getInt64Bytes: function( x )
    {
        var bytes = [];
        var i = 8;
        do {
            bytes[--i] = x & (255);
            x = x>>8;
        } while ( i )
        return bytes;
    },
    strToUtf8Bytes: function(str)
    {
        const utf8 = [];
        for (let ii = 0; ii < str.length; ii++) {
            let charCode = str.charCodeAt(ii);
            if (charCode < 0x80) utf8.push(charCode);
            else if (charCode < 0x800) {
            utf8.push(0xc0 | (charCode >> 6), 0x80 | (charCode & 0x3f));
            } else if (charCode < 0xd800 || charCode >= 0xe000) {
            utf8.push(0xe0 | (charCode >> 12), 0x80 | ((charCode >> 6) & 0x3f), 0x80 | (charCode & 0x3f));
            } else {
            ii++;
            // Surrogate pair:
            // UTF-16 encodes 0x10000-0x10FFFF by subtracting 0x10000 and
            // splitting the 20 bits of 0x0-0xFFFFF into two halves
            charCode = 0x10000 + (((charCode & 0x3ff) << 10) | (str.charCodeAt(ii) & 0x3ff));
            utf8.push(
                0xf0 | (charCode >> 18),
                0x80 | ((charCode >> 12) & 0x3f),
                0x80 | ((charCode >> 6) & 0x3f),
                0x80 | (charCode & 0x3f),
            );
            }
        }
        return utf8;
    },
    utf8ArrayToStr: function(array)
    {
        var out, i, len, c;
        var char2, char3;
    
        out = "";
        len = array.length;
        i = 0;
        while(i < len) {
            c = array[i++];
            switch(c >> 4)
            { 
            case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                // 0xxxxxxx
                out += String.fromCharCode(c);
                break;
            case 12: case 13:
                // 110x xxxx   10xx xxxx
                char2 = array[i++];
                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                break;
            case 14:
                // 1110 xxxx  10xx xxxx  10xx xxxx
                char2 = array[i++];
                char3 = array[i++];
                out += String.fromCharCode(((c & 0x0F) << 12) |
                            ((char2 & 0x3F) << 6) |
                            ((char3 & 0x3F) << 0));
                break;
            }
        }
    
        return out;
    },
    newDate(year, month, date, hour, minute, second, timezone = 8)
    {
        const curTime = new Date();
        const offsetHour = timezone - ((0 - curTime.getTimezoneOffset()) / 60);
        const dateTime = new Date(year, month-1, date, hour, minute, second);
        return new Date(dateTime.getTime() - offsetHour * 60 * 60 * 1000);
    }
}