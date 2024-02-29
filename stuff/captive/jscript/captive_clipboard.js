// $Id: captive_clipboard.js,v 1.2 2005/08/27 00:36:49 chris Exp $

/*

Clipboard decoder for Captive game by Anthony Crowther (Mindscape)
This program decodes bar clipboards only.

Copyright (c) 1993-2002 Laurent de Soras (laurent@ohmforce.com)
Copyright (c) 2005 Chris Pile

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
or look at http://www.gnu.org/licenses/gpl.txt

*/

function generate(){
    var mission = document.ClipboardForm.mission.value;
    var level = document.ClipboardForm.level.value;
    var code = document.ClipboardForm.code.value;

    if( isNaN(mission) || (mission > 6000) ) {
        alert("Mission must be a valid number between 1 and 6000");
        return false;
    }
    if( isNaN(level) || (level > 10) ) {
        alert("Level must be a valid number between 0 and 10");
        return false;
    }
    if( isNaN(code) ) {
        alert("Code must be a valid number");
        return false;
    }

    var val = decode_16(mission, level, code);
    display_16(code, val);
}//end function 

function decode_16(mission, level, code) {
    var d = 48771 - (mission * 11 + parseInt(level)) * 16679;
    var b = d - code;
    var val = b / 295;

    while( (b % 295) != 0 || code != ((d - 16679 * val) & 0xFFFF)) {
        b += 16384;
        val = b / 295;
    }

        return(val);
}//end function 

function display_16(code, val) {
    var col_list = new Array(1, 3, 1, 1, 3, 3, 1, 3, 0, 2, 3, 4, 0, 1, 2, 4);
    var row_list = new Array(0, 0, 1, 2, 2, 3, 4, 4, 1, 1, 1, 1, 3, 3, 3, 3);
    var screen_0 = new Array(5);
    for(var i=0; i < 5; i++) {
        screen_0[i] = new Array(5);
    }
    var data = "";

    for(var bar = 0;bar < 16;bar++) {
        if( (val & (1 << bar)) != 0 ) {
            var col = col_list[bar];
            var row = row_list[bar];

            var bar_char = bar < 8 ? " - " : " | ";
            screen_0[row][col] = bar_char;
        }
    }

    for(var r = 0;r < 5;r++) {
        for(var c = 0;c < 5;c++) {
            if(screen_0[r][c]) {
                data += screen_0[r][c];
            }
            else {
                data += " . ";
            }
        }
            data += "\n";
    }
    document.ClipboardForm.results.value = data;

}//end function 
