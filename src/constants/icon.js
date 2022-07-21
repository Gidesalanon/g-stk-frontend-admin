import React from 'react';

const ICONES_STRING = [
    'agricole',
    'climat',
    'climate-change',
    'dossier',
    'drop-1',
    'drop',
    'eauSouterraine',
    'eauSurface',
    'map',
    'population-1',
    'population',
    'procedure',
    'process',
    'qe',
    'retenueau',
    'robinet',
    'security-1',
    'temperature',
    'thermometer',
    'wind',
];

let ICONES_OPTIONS = {};

['Blanc', 'Bleu', 'Noir'].forEach(c => {
    ICONES_OPTIONS[c] = {};
    ['PNG', 'SVG'].forEach(f => {
        ICONES_OPTIONS[c][f] = ICONES_STRING.map(i => {
            return { value: i, label: <img alt={i} height="25px" width="25px" src={`./icones/${c}/${f}/${i}.png`}/> };
        });
    });
});

export { ICONES_STRING, ICONES_OPTIONS };