"use strict";
var comb = exports;
/**@namespace comb characters*/
comb.characters = {
    /**@lends comb.characters*/

    /**
     * ☺
     */
    SMILEY: "☺",
    /**
     * ☻
     */
    SOLID_SMILEY: "☻",

    /**
     * ♥
     */
    HEART: "♥",
    /**
     * ♦
     */
    DIAMOND: "♦",
    /**
     * ♣
     */
    CLOVE: "♣",
    /**
     * ♠
     */
    SPADE: "♠",
    /**
     * •
     */
    DOT: "•",
    /**
     * ◘
     */
    SQUARE_CIRCLE: "◘",
    /**
     * ○
     */
    CIRCLE: "○",
    /**
     * ◙
     */
    FILLED_SQUARE_CIRCLE: "◙",
    /**
     * ♂
     */
    MALE: "♂",
    /**
     * ♀
     */
    FEMALE: "♀",
    /**
     * ♪
     */
    EIGHT_NOTE: "♪",
    /**
     * ♫
     */
    DOUBLE_EIGHT_NOTE: "♫",
    /**
     * ☼
     */
    SUN: "☼",
    /**
     * ►
     */
    PLAY: "►",
    /**
     * ◄
     */
    REWIND: "◄",
    /**
     * ↕
     */
    UP_DOWN: "↕",
    /**
     * ¶
     */
    PILCROW: "¶",
    /**
     * §
     */
    SECTION: "§",
    /**
     * ▬
     */
    THICK_MINUS: "▬",
    /**
     * ↨
     */
    SMALL_UP_DOWN: "↨",
    /**
     * ↑
     */
    UP_ARROW: "↑",
    /**
     * ↓
     */
    DOWN_ARROW: "↓",
    /**
     * →
     */
    RIGHT_ARROW: "→",
    /**
     * ←
     */
    LEFT_ARROW: "←",
    /**
     * ∟
     */
    RIGHT_ANGLE: "∟",
    /**
     * ↔
     */
    LEFT_RIGHT_ARROW: "↔",
    /**
     * ▲
     */
    TRIANGLE: "▲",
    /**
     * ▼
     */
    DOWN_TRIANGLE: "▼",

    /**
     * ⌂
     */
    HOUSE: "⌂",
    /**
     * Ç
     */
    C_CEDILLA: "Ç",
    /**
     * ü
     */
    U_UMLAUT: "ü",
    /**
     * é
     */
    E_ACCENT: "é",
    /**
     * â
     */
    A_LOWER_CIRCUMFLEX: "â",
    /**
     * ä
     */
    A_LOWER_UMLAUT: "ä",
    /**
     * à
     */
    A_LOWER_GRAVE_ACCENT: "à",
    /**
     * å
     */
    A_LOWER_CIRCLE_OVER: "å",
    /**
     * ç
     */
    C_LOWER_CIRCUMFLEX: "ç",
    /**
     * ê
     */
    E_LOWER_CIRCUMFLEX: "ê",
    /**
     * ë
     */
    E_LOWER_UMLAUT: "ë",
    /**
     * è
     */
    E_LOWER_GRAVE_ACCENT: "è",
    /**
     * ï
     */
    I_LOWER_UMLAUT: "ï",
    /**
     * î
     */
    I_LOWER_CIRCUMFLEX: "î",
    /**
     * ì
     */
    I_LOWER_GRAVE_ACCENT: "ì",
    /**
     * Ä
     */
    A_UPPER_UMLAUT: "Ä",
    /**
     * Å
     */
    A_UPPER_CIRCLE: "Å",
    /**
     * É
     */
    E_UPPER_ACCENT: "É",
    /**
     * æ
     */
    A_E_LOWER: "æ",
    /**
     * Æ
     */
    A_E_UPPER: "Æ",
    /**
     * ô
     */
    O_LOWER_CIRCUMFLEX: "ô",
    /**
     * ö
     */
    O_LOWER_UMLAUT: "ö",
    /**
     * ò
     */
    O_LOWER_GRAVE_ACCENT: "ò",
    /**
     * û
     */
    U_LOWER_CIRCUMFLEX: "û",
    /**
     * ù
     */
    U_LOWER_GRAVE_ACCENT: "ù",
    /**
     * ÿ
     */
    Y_LOWER_UMLAUT: "ÿ",
    /**
     * Ö
     */
    O_UPPER_UMLAUT: "Ö",
    /**
     * Ü
     */
    U_UPPER_UMLAUT: "Ü",

    /**
     * ¢
     */
    CENTS: "¢",
    /**
     * £
     */
    POUND: "£",
    /**
     * ¥
     */
    YEN: "¥",
    /**
     * ¤
     */
    CURRENCY: "¤",

    /**
     * ₧
     */
    PTS: "₧",
    /**
     * ƒ
     */
    FUNCTION: "ƒ",
    /**
     * á
     */
    A_LOWER_ACCENT: "á",
    /**
     * í
     */
    I_LOWER_ACCENT: "í",
    /**
     * ó
     */
    O_LOWER_ACCENT: "ó",
    /**
     * ú
     */
    U_LOWER_ACCENT: "ú",
    /**
     * ñ
     */
    N_LOWER_TILDE: "ñ",
    /**
     * Ñ
     */
    N_UPPER_TILDE: "Ñ",
    /**
     * ª
     */
    A_SUPER: "ª",
    /**
     * º
     */
    O_SUPER: "º",
    /**
     * ¿
     */
    UPSIDEDOWN_QUESTION: "¿",
    /**
     * ⌐
     */
    SIDEWAYS_L: "⌐",
    /**
     * ¬
     */
    NEGATION: "¬",
    /**
     * ½
     */
    ONE_HALF: "½",
    /**
     * ¼
     */
    ONE_FOURTH: "¼",
    /**
     * ¡
     */
    UPSIDEDOWN_EXCLAMATION: "¡",
    /**
     * «
     */
    DOUBLE_LEFT: "«",
    /**
     * »
     */
    DOUBLE_RIGHT: "»",
    /**
     * ░
     */
    LIGHT_SHADED_BOX: "░",
    /**
     * ▒
     */
    MEDIUM_SHADED_BOX: "▒",
    /**
     * ▓
     */
    DARK_SHADED_BOX: "▓",
    /**
     * │
     */
    VERTICAL_LINE: "│",

    /**
     * ┤
     */
    MAZE__SINGLE_RIGHT_T: "┤",
    /**
     * ┐
     */
    MAZE_SINGLE_RIGHT_TOP: "┐",
    /**
     * ┘
     */
    MAZE_SINGLE_RIGHT_BOTTOM_SMALL: "┘",
    /**
     * ┌
     */
    MAZE_SINGLE_LEFT_TOP_SMALL: "┌",
    /**
     * └
     */
    MAZE_SINGLE_LEFT_BOTTOM_SMALL: "└",
    /**
     * ├
     */
    MAZE_SINGLE_LEFT_T: "├",
    /**
     * ┴
     */
    MAZE_SINGLE_BOTTOM_T: "┴",
    /**
     * ┬
     */
    MAZE_SINGLE_TOP_T: "┬",
    /**
     * ┼
     */
    MAZE_SINGLE_CENTER: "┼",
    /**
     * ─
     */
    MAZE_SINGLE_HORIZONTAL_LINE: "─",

    /**
     * ╡
     */
    MAZE_SINGLE_RIGHT_DOUBLECENTER_T: "╡",
    /**
     * ╛
     */
    MAZE_SINGLE_RIGHT_DOUBLE_BL: "╛",
    /**
     * ╢
     */
    MAZE_SINGLE_RIGHT_DOUBLE_T: "╢",
    /**
     * ╖
     */
    MAZE_SINGLE_RIGHT_DOUBLEBOTTOM_TOP: "╖",
    /**
     * ╕
     */
    MAZE_SINGLE_RIGHT_DOUBLELEFT_TOP: "╕",
    /**
     * ╞
     */
    MAZE_SINGLE_LEFT_DOUBLE_T: "╞",

    /**
     * ╧
     */
    MAZE_SINGLE_BOTTOM_DOUBLE_T: "╧",
    /**
     * ╤
     */
    MAZE_SINGLE_TOP_DOUBLE_T: "╤",
    /**
     * ╥
     */
    MAZE_SINGLE_TOP_DOUBLECENTER_T: "╥",
    /**
     * ╨
     */
    MAZE_SINGLE_BOTTOM_DOUBLECENTER_T: "╨",
    /**
     * ╘
     */
    MAZE_SINGLE_LEFT_DOUBLERIGHT_BOTTOM: "╘",
    /**
     * ╒
     */
    MAZE_SINGLE_LEFT_DOUBLERIGHT_TOP: "╒",
    /**
     * ╓
     */
    MAZE_SINGLE_LEFT_DOUBLEBOTTOM_TOP: "╓",
    /**
     * ╙
     */
    MAZE_SINGLE_LEFT_DOUBLETOP_BOTTOM: "╙",
    /**
     * Γ
     */
    MAZE_SINGLE_LEFT_TOP: "Γ",
    /**
     * ╜
     */
    MAZE_SINGLE_RIGHT_BOTTOM: "╜",
    /**
     * ╟
     */
    MAZE_SINGLE_LEFT_CENTER: "╟",
    /**
     * ╫
     */
    MAZE_SINGLE_DOUBLECENTER_CENTER: "╫",
    /**
     * ╪
     */
    MAZE_SINGLE_DOUBLECROSS_CENTER: "╪",


    /**
     * ╣
     */
    MAZE_DOUBLE_LEFT_CENTER: "╣",
    /**
     * ║
     */
    MAZE_DOUBLE_VERTICAL: "║",
    /**
     * ╗
     */
    MAZE_DOUBLE_RIGHT_TOP: "╗",
    /**
     * ╝
     */
    MAZE_DOUBLE_RIGHT_BOTTOM: "╝",
    /**
     * ╚
     */
    MAZE_DOUBLE_LEFT_BOTTOM: "╚",
    /**
     * ╔
     */
    MAZE_DOUBLE_LEFT_TOP: "╔",
    /**
     * ╩
     */
    MAZE_DOUBLE_BOTTOM_T: "╩",
    /**
     * ╦
     */
    MAZE_DOUBLE_TOP_T: "╦",
    /**
     * ╠
     */
    MAZE_DOUBLE_LEFT_T: "╠",
    /**
     * ═
     */
    MAZE_DOUBLE_HORIZONTAL: "═",
    /**
     * ╬
     */
    MAZE_DOUBLE_CROSS: "╬",

    /**
     * █
     */
    SOLID_RECTANGLE: "█",
    /**
     * ▌
     */
    THICK_LEFT_VERTICAL: "▌",
    /**
     * ▐
     */
    THICK_RIGHT_VERTICAL: "▐",
    /**
     * ▄
     */
    SOLID_SMALL_RECTANGLE_BOTTOM: "▄",
    /**
     * ▀
     */
    SOLID_SMALL_RECTANGLE_TOP: "▀",

    /**
     * Φ
     */
    PHI_UPPER: "Φ",

    /**
     * ∞
     */
    INFINITY: "∞",
    /**
     * ∩
     */
    INTERSECTION: "∩",
    /**
     * ≡
     */
    DEFINITION: "≡",
    /**
     * ±
     */
    PLUS_MINUS: "±",
    /**
     * ≥
     */
    GT_EQ: "≥",
    /**
     * ≤
     */
    LT_EQ: "≤",
    /**
     * ⌠
     */
    THEREFORE: "⌠",
    /**
     * ∵
     */
    SINCE: "∵",
    /**
     * ∄
     */
    DOESNOT_EXIST: "∄",
    /**
     * ∃
     */
    EXISTS: "∃",
    /**
     * ∀
     */
    FOR_ALL: "∀",
    /**
     * ⊕
     */
    EXCLUSIVE_OR: "⊕",
    /**
     * ⌡
     */
    BECAUSE: "⌡",
    /**
     * ÷
     */
    DIVIDE: "÷",
    /**
     * ≈
     */
    APPROX: "≈",

    /**
     * °
     */
    DEGREE: "°",
    /**
     * ∙
     */
    BOLD_DOT: "∙",
    /**
     * ·
     */
    DOT_SMALL: "·",
    /**
     * √
     */
    CHECK: "√",
    /**
     * ✗
     */
    ITALIC_X: "✗",
    /**
     * ⁿ
     */
    SUPER_N: "ⁿ",
    /**
     * ²
     */
    SQUARED: "²",
    /**
     * ³
     */
    CUBED: "³",
    /**
     * ■
     */
    SOLID_BOX: "■",
    /**
     * ‰
     */
    PERMILE: "‰",
    /**
     * ®
     */
    REGISTERED_TM: "®",
    /**
     * ©
     */
    COPYRIGHT: "©",
    /**
     * ™
     */
    TRADEMARK: "™",

    /**
     * β
     */
    BETA: "β",
    /**
     * γ
     */
    GAMMA: "γ",
    /**
     * ζ
     */
    ZETA: "ζ",
    /**
     * η
     */
    ETA: "η",
    /**
     * ι
     */
    IOTA: "ι",
    /**
     * κ
     */
    KAPPA: "κ",
    /**
     * λ
     */
    LAMBDA: "λ",
    /**
     * ν
     */
    NU: "ν",
    /**
     * ξ
     */
    XI: "ξ",
    /**
     * ο
     */
    OMICRON: "ο",
    /**
     * ρ
     */
    RHO: "ρ",
    /**
     * υ
     */
    UPSILON: "υ",
    /**
     * φ
     */
    CHI_LOWER: "φ",
    /**
     * χ
     */
    CHI_UPPER: "χ",
    /**
     * ψ
     */
    PSI: "ψ",
    /**
     * α
     */
    ALPHA: "α",
    /**
     * ß
     */
    ESZETT: "ß",
    /**
     * π
     */
    PI: "π",
    /**
     * Σ
     */
    SIGMA_UPPER: "Σ",
    /**
     * σ
     */
    SIGMA_LOWER: "σ",
    /**
     * µ
     */
    MU: "µ",
    /**
     * τ
     */
    TAU: "τ",
    /**
     * Θ
     */
    THETA: "Θ",
    /**
     * Ω
     */
    OMEGA: "Ω",
    /**
     * δ
     */
    DELTA: "δ",
    /**
     * φ
     */
    PHI_LOWER: "φ",
    /**
     * ε
     */
    EPSILON: "ε"


};