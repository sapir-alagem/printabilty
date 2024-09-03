const paymentsCurrencysMap = [
  {
    currency: "Albania Lek",
    abbreviation: "ALL",
    symbol: "Lek",
  },
  {
    currency: "Afghanistan Afghani",
    abbreviation: "AFN",
    symbol: "؋",
  },
  {
    currency: "Argentina Peso",
    abbreviation: "ARS",
    symbol: "$",
  },
  {
    currency: "Aruba Guilder",
    abbreviation: "AWG",
    symbol: "ƒ",
  },
  {
    currency: "Australia Dollar",
    abbreviation: "AUD",
    symbol: "$",
  },
  {
    currency: "Azerbaijan New Manat",
    abbreviation: "AZN",
    symbol: "ман",
  },
  {
    currency: "Barbados Dollar",
    abbreviation: "BBD",
    symbol: "$",
  },
  {
    currency: "Belarus Ruble",
    abbreviation: "BYN",
    symbol: "p.",
  },
  {
    currency: "Belize Dollar",
    abbreviation: "BZD",
    symbol: "BZ$",
  },
  {
    currency: "Bermuda Dollar",
    abbreviation: "BMD",
    symbol: "$",
  },
  {
    currency: "Bolivia Boliviano",
    abbreviation: "BOB",
    symbol: "$b",
  },
  {
    currency: "Brazil Real",
    abbreviation: "BRL",
    symbol: "R$",
  },
  {
    currency: "Brunei Darussalam Dollar",
    abbreviation: "BND",
    symbol: "$",
  },
  {
    currency: "Bulgaria Lev",
    abbreviation: "BGN",
    symbol: "лв",
  },
  {
    currency: "Canada Dollar",
    abbreviation: "CAD",
    symbol: "$",
  },
  {
    currency: "Chile Peso",
    abbreviation: "CLP",
    symbol: "$",
  },
  {
    currency: "China Yuan Renminbi",
    abbreviation: "CNY",
    symbol: "¥",
  },
  {
    currency: "Colombia Peso",
    abbreviation: "COP",
    symbol: "$",
  },
  {
    currency: "Costa Rica Colon",
    abbreviation: "CRC",
    symbol: "₡",
  },
  {
    currency: "Czech Republic Koruna",
    abbreviation: "CZK",
    symbol: "Kč",
  },
  {
    currency: "Denmark Krone",
    abbreviation: "DKK",
    symbol: "kr",
  },
  {
    currency: "Dominican Republic Peso",
    abbreviation: "DOP",
    symbol: "RD$",
  },
  {
    currency: "Egypt Pound",
    abbreviation: "EGP",
    symbol: "£",
  },
  {
    currency: "Euro Member Countries",
    abbreviation: "EUR",
    symbol: "€",
  },
  {
    currency: "Falkland Islands (Malvinas) Pound",
    abbreviation: "FKP",
    symbol: "£",
  },
  {
    currency: "Gibraltar Pound",
    abbreviation: "GIP",
    symbol: "£",
  },
  {
    currency: "Guatemala Quetzal",
    abbreviation: "GTQ",
    symbol: "Q",
  },
  {
    currency: "Guyana Dollar",
    abbreviation: "GYD",
    symbol: "$",
  },
  {
    currency: "Hong Kong Dollar",
    abbreviation: "HKD",
    symbol: "$",
  },
  {
    currency: "Hungary Forint",
    abbreviation: "HUF",
    symbol: "Ft",
  },
  {
    currency: "Iceland Krona",
    abbreviation: "ISK",
    symbol: "kr",
  },
  {
    currency: "India Rupee",
    abbreviation: "INR",
    symbol: "₹",
  },
  {
    currency: "Indonesia Rupiah",
    abbreviation: "IDR",
    symbol: "Rp",
  },
  {
    currency: "Israel Shekel",
    abbreviation: "ILS",
    symbol: "₪",
  },
  {
    currency: "Jamaica Dollar",
    abbreviation: "JMD",
    symbol: "J$",
  },
  {
    currency: "Japan Yen",
    abbreviation: "JPY",
    symbol: "¥",
  },
  {
    currency: "Kazakhstan Tenge",
    abbreviation: "KZT",
    symbol: "лв",
  },
  {
    currency: "Korea (North) Won",
    abbreviation: "KPW",
    symbol: "₩",
  },
  {
    currency: "Korea (South) Won",
    abbreviation: "KRW",
    symbol: "₩",
  },
  {
    currency: "Kyrgyzstan Som",
    abbreviation: "KGS",
    symbol: "лв",
  },
  {
    currency: "Laos Kip",
    abbreviation: "LAK",
    symbol: "₭",
  },
  {
    currency: "Lebanon Pound",
    abbreviation: "LBP",
    symbol: "£",
  },
  {
    currency: "Sri Lanka Rupee",
    abbreviation: "LKR",
    symbol: "₨",
  },
  {
    currency: "Liberia Dollar",
    abbreviation: "LRD",
    symbol: "$",
  },
  {
    currency: "Macedonia Denar",
    abbreviation: "MKD",
    symbol: "ден",
  },
  {
    currency: "Malaysia Ringgit",
    abbreviation: "MYR",
    symbol: "RM",
  },
  {
    currency: "Mexico Peso",
    abbreviation: "MXN",
    symbol: "$",
  },
  {
    currency: "Mongolia Tughrik",
    abbreviation: "MNT",
    symbol: "₮",
  },
  {
    currency: "Mozambique Metical",
    abbreviation: "MZN",
    symbol: "MT",
  },
  {
    currency: "Namibia Dollar",
    abbreviation: "NAD",
    symbol: "$",
  },
  {
    currency: "Nepal Rupee",
    abbreviation: "NPR",
    symbol: "₨",
  },
  {
    currency: "New Zealand Dollar",
    abbreviation: "NZD",
    symbol: "$",
  },
  {
    currency: "Nicaragua Cordoba",
    abbreviation: "NIO",
    symbol: "C$",
  },
  {
    currency: "Norway Krone",
    abbreviation: "NOK",
    symbol: "kr",
  },
  {
    currency: "Pakistan Rupee",
    abbreviation: "PKR",
    symbol: "₨",
  },
  {
    currency: "Panama Balboa",
    abbreviation: "PAB",
    symbol: "B/.",
  },
  {
    currency: "Peru Nuevo Sol",
    abbreviation: "PEN",
    symbol: "S/.",
  },
  {
    currency: "Philippines Peso",
    abbreviation: "PHP",
    symbol: "₱",
  },
  {
    currency: "Poland Zloty",
    abbreviation: "PLN",
    symbol: "zł",
  },
  {
    currency: "Qatar Riyal",
    abbreviation: "QAR",
    symbol: "﷼",
  },
  {
    currency: "Romania New Leu",
    abbreviation: "RON",
    symbol: "lei",
  },
  {
    currency: "Russia Ruble",
    abbreviation: "RUB",
    symbol: "руб",
  },
  {
    currency: "Saudi Arabia Riyal",
    abbreviation: "SAR",
    symbol: "﷼",
  },
  {
    currency: "Serbia Dinar",
    abbreviation: "RSD",
    symbol: "Дин.",
  },
  {
    currency: "Seychelles Rupee",
    abbreviation: "SCR",
    symbol: "₨",
  },
  {
    currency: "Singapore Dollar",
    abbreviation: "SGD",
    symbol: "$",
  },
  {
    currency: "Solomon Islands Dollar",
    abbreviation: "SBD",
    symbol: "$",
  },
  {
    currency: "South Africa Rand",
    abbreviation: "ZAR",
    symbol: "R",
  },
  {
    currency: "Sweden Krona",
    abbreviation: "SEK",
    symbol: "kr",
  },
  {
    currency: "Switzerland Franc",
    abbreviation: "CHF",
    symbol: "CHF",
  },
  {
    currency: "Suriname Dollar",
    abbreviation: "SRD",
    symbol: "$",
  },
  {
    currency: "Taiwan New Dollar",
    abbreviation: "TWD",
    symbol: "NT$",
  },
  {
    currency: "Thailand Baht",
    abbreviation: "THB",
    symbol: "฿",
  },
  {
    currency: "Trinidad and Tobago Dollar",
    abbreviation: "TTD",
    symbol: "TT$",
  },
  {
    currency: "Turkey Lira",
    abbreviation: "TRY",
    symbol: "",
  },
  {
    currency: "Ukraine Hryvna",
    abbreviation: "UAH",
    symbol: "₴",
  },
  {
    currency: "United Kingdom Pound",
    abbreviation: "GBP",
    symbol: "£",
  },
  {
    currency: "United States Dollar",
    abbreviation: "USD",
    symbol: "$",
  },
  {
    currency: "Uruguay Peso",
    abbreviation: "UYU",
    symbol: "$U",
  },
  {
    currency: "Uzbekistan Som",
    abbreviation: "UZS",
    symbol: "лв",
  },
  {
    currency: "Venezuela Bolivar",
    abbreviation: "VEF",
    symbol: "Bs",
  },
  {
    currency: "Vietnam Dong",
    abbreviation: "VND",
    symbol: "₫",
  },
  {
    currency: "Yemen Rial",
    abbreviation: "YER",
    symbol: "﷼",
  },
  {
    currency: "Zimbabwe Dollar",
    abbreviation: "ZWL",
    symbol: "Z$",
  },
];

export default paymentsCurrencysMap;
