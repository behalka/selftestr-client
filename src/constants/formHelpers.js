export default {
  helpers: {
    questionText: 'Zadání otázky. Bude zobrazeno uživateli při vyplňování testu.',
    textAnswer: 'Odpověď, kterou uživatel musí zadat, aby se otázka vyhodnotila\
      jako správně zodpovězená.',
    explanation: 'Krátké vysvětlení, které uživateli pomůže pochopit, správnost odpovědi.\
      Bude zobrazeno při průchodu výsledky, můžeme tam tedy klidně napsat \
      jaké bylo správné řešení.',
    choiceAnswer: 'Odpověď bude zobrazena uživateli jako jedna z možností. Odpověď je správně \
      pokud ji uživatel zaškrtne a zároveň je označena jako správná v editoru.',
    singlechoiceAnswer: 'Odpověď bude zobrazena uživateli jako jedna z možností. Odpověď je správně \
      pokud ji uživatel zvolí a zároveň je označena jako správná v editoru.',
    timeLimit: 'K vyplňování testu je možné zadat časový limit, ve kterém ho vyplňující \
      uživatelé mají dokončit. Časový limit se zadává ve vteřinách.',
    questionsPerInstance: 'Počet otázek, které bude obsahovat vygenerovaný test k vyplňování. \
      Otázky jsou vybrané náhodně a v náhodném pořadí.',
  },
  btns: {
    discard: 'Vrátí zpět hodnoty podle posledního uložení.',
    delete: 'Nenávratně vymaže otázku a odpovědi.',
  }
}
