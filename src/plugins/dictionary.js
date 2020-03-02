import Vue from "vue"

const dictionary = {
    __l: "en",
    test: {
        en: "Test $2 $1"
    },
    config: {
        en: "Config",
        de: "Konfiguration",
    },

    save: {
        "en": "Save",
        "fr": "Sauvegarder",
        "nl": "Opslaan",
        "es": "Salvar",
        "pt": "Salve",
        "it": "Salvare",
        "de": "Speichern",
        "pl": "Zapisać",
        "ru": "Сохранить",
        "zh-cn": "保存"
    },
    saveclose: {
        "en": "Save and close",
        "fr": "Sauver et fermer",
        "nl": "Opslaan en afsluiten",
        "es": "Guardar y cerrar",
        "pt": "Salvar e fechar",
        "it": "Salva e chiudi",
        "de": "Speichern und schließen",
        "pl": "Zapisz i zamknij",
        "ru": "Сохранить и выйти",
        "zh-cn": "保存并关闭"
    },
    none: {
        "en": "none",
        "fr": "aucun",
        "nl": "geen",
        "es": "ninguna",
        "pt": "Nenhum",
        "it": "nessuna",
        "de": "keins",
        "pl": "Żaden",
        "ru": "никто",
        "zh-cn": "无"
    },
    nonerooms: {
        "en": "",
        "fr": "",
        "nl": "",
        "es": "",
        "pt": "",
        "it": "",
        "de": "",
        "pl": "",
        "ru": "",
        "zh-cn": ""
    },
    nonefunctions: {
        "en": "",
        "fr": "",
        "nl": "",
        "es": "",
        "pt": "",
        "it": "",
        "de": "",
        "pl": "",
        "ru": "",
        "zh-cn": ""
    },
    all: {
        "en": "all",
        "fr": "tout",
        "nl": "alle",
        "es": "todas",
        "pt": "todos",
        "it": "tutti",
        "de": "alle",
        "pl": "wszystko",
        "ru": "все",
        "zh-cn": "所有"
    },
    edit: {
        "en": "edit",
        "fr": "modifier",
        "nl": "Bewerk",
        "es": "editar",
        "pt": "editar",
        "it": "modificare",
        "de": "Ändern",
        "pl": "edytować",
        "ru": "Изменить",
        "zh-cn": "编辑"
    },
    pair: {
        "en": "pair",
        "fr": "paire",
        "nl": "paar",
        "es": "par",
        "pt": "par",
        "it": "paio",
        "de": "Verbinden",
        "pl": "para",
        "ru": "Связать",
        "zh-cn": "配对"
    },
    unpair: {
        "en": "unpair",
        "fr": "unpair",
        "nl": "Unpair",
        "es": "desvincular",
        "pt": "unpair",
        "it": "Disaccoppia",
        "de": "Trennen",
        "pl": "unpair",
        "ru": "Разорвать связь",
        "zh-cn": "取消配对"
    },
    ok: {
        "en": "Ok",
        "fr": "D'accord",
        "nl": "OK",
        "es": "De acuerdo",
        "pt": "Está bem",
        "it": "Ok",
        "de": "Ok",
        "pl": "Ok",
        "ru": "Ok",
        "zh-cn": "确认"
    },
    cancel: {
        "en": "Cancel",
        "fr": "Annuler",
        "nl": "Annuleer",
        "es": "Cancelar",
        "pt": "Cancelar",
        "it": "Annulla",
        "de": "Abbrechen",
        "pl": "Anuluj",
        "ru": "Отмена",
        "zh-cn": "取消"
    },
    Message: {
        "en": "Message",
        "fr": "Message",
        "nl": "Bericht",
        "es": "Mensaje",
        "pt": "Mensagem",
        "it": "Messaggio",
        "de": "Mitteilung",
        "pl": "Wiadomość",
        "ru": "Сообщение",
        "zh-cn": "信息"
    },
    close: {
        "en": "Close",
        "fr": "Fermer",
        "nl": "Dichtbij",
        "es": "Cerca",
        "pt": "Fechar",
        "it": "Vicino",
        "de": "Schließen",
        "pl": "Blisko",
        "ru": "Закрыть",
        "zh-cn": "关闭"
    },
    htooltip: {
        "en": "Click for help",
        "fr": "Cliquez pour obtenir de l'aide",
        "nl": "Klik voor hulp",
        "es": "Haz clic para obtener ayuda",
        "pt": "Clique para ajuda",
        "it": "Fai clic per chiedere aiuto",
        "de": "Anklicken",
        "pl": "Kliknij, aby uzyskać pomoc",
        "ru": "Перейти по ссылке",
        "zh-cn": "单击获取帮助"
    },
    saveConfig: {
        "en": "Save configuration to file",
        "de": "Speichern Sie die Konfiguration in der Datei",
        "ru": "Сохранить конфигурацию в файл",
        "pt": "Salvar configuração no arquivo",
        "nl": "Sla configuratie op naar bestand",
        "fr": "Enregistrer la configuration dans un fichier",
        "it": "Salva la configurazione nel file",
        "es": "Guardar configuración en archivo",
        "pl": "Zapisz konfigurację do pliku",
        "zh-cn": "将配置保存到文件"
    },
    loadConfig: {
        "en": "Load configuration from file",
        "de": "Laden Sie die Konfiguration aus der Datei",
        "ru": "Загрузить конфигурацию из файла",
        "pt": "Carregar configuração do arquivo",
        "nl": "Laad de configuratie uit het bestand",
        "fr": "Charger la configuration à partir du fichier",
        "it": "Carica la configurazione dal file",
        "es": "Cargar configuración desde archivo",
        "pl": "Załaduj konfigurację z pliku",
        "zh-cn": "从文件加载配置"
    },
    otherConfig: {
        "en": "Configuration from other adapter %s",
        "de": "Konfiguration von anderem Adapter %s",
        "ru": "Конфигурация из другого адаптера %s",
        "pt": "Configuração de outro adaptador %s",
        "nl": "Configuratie vanaf andere adapter %s",
        "fr": "Configuration à partir d'un autre adaptateur %s",
        "it": "Configurazione da altro adattatore %s",
        "es": "Configuración desde otro adaptador %s",
        "pl": "Konfiguracja z innego adaptera %s",
        "zh-cn": "从其他适配器%s配置"
    },
    invalidConfig: {
        "en": "Invalid JSON file",
        "de": "Ungültige JSON-Datei",
        "ru": "Недопустимый файл JSON",
        "pt": "Arquivo JSON inválido",
        "nl": "Ongeldig JSON-bestand",
        "fr": "Fichier JSON non valide",
        "it": "File JSON non valido",
        "es": "Archivo JSON no válido",
        "pl": "Nieprawidłowy plik JSON",
        "zh-cn": "无效的JSON文件"
    },
    configLoaded: {
        "en": "Configuration was successfully loaded",
        "de": "Die Konfiguration wurde erfolgreich geladen",
        "ru": "Конфигурация успешно загружена",
        "pt": "Configuração foi carregada com sucesso",
        "nl": "Configuratie is succesvol geladen",
        "fr": "La configuration a été chargée avec succès",
        "it": "La configurazione è stata caricata correttamente",
        "es": "La configuración se cargó correctamente",
        "pl": "Konfiguracja została pomyślnie załadowana",
        "zh-cn": "配置已成功加载"
    },
    maxTableRaw: {
        "en": "Maximum number of allowed raws",
        "de": "Maximale Anzahl von erlaubten Tabellenzeilen",
        "ru": "Достигнуто максимальное число строк",
        "it": "Numero massimo di raw consentiti",
        "fr": "Nombre maximum de raw autorisés",
        "nl": "Maximumaantal toegestane raws",
        "pt": "Número máximo de raias permitidas",
        "es": "Número máximo de raws permitidos",
        "pl": "Maksymalna liczba dozwolonych surowców",
        "zh-cn": "允许的最大原始数量"
    },
    maxTableRawInfo: {
        "en": "Warning",
        "de": "Warnung",
        "ru": "Внимание",
        "pt": "Atenção",
        "nl": "Waarschuwing",
        "fr": "Attention",
        "it": "avvertimento",
        "es": "Advertencia",
        "pl": "Ostrzeżenie",
        "zh-cn": "警告"
    },
};

dictionary["delete"] = {
    "en": "delete",
    "fr": "effacer",
    "nl": "Delete",
    "es": "borrar",
    "pt": "excluir",
    "it": "Elimina",
    "de": "Löschen",
    "pl": "kasować",
    "ru": "Удалить",
    "zh-cn": "删除"
};

const toadd = {};

function translate(what, ...args) {
    if (!what) return "";

    let i = 0;
    let dl = Vue.prototype.$store && Vue.prototype.$store.state && Vue.prototype.$store.state.lang || "en";
    //    debugger;
    if (dictionary[what] && dictionary[what][dl])
        what = dictionary[what][dl];
    else {
        let n = {
            [dictionary.__l]: "'" + what + "' for '" + dl + "' to be created/edited!"
        };
        if (!toadd[what]) {
            console.log('dictionary:', n[dl])
            toadd[what] = n;
        }
        if (dl !== 'en' && dictionary[what] && dictionary[what]['en'])
            what = dictionary[what]['en'];
    }
    while (i < args.length) {
        let rs = "$" + (i + 1).toString();
        while (what.indexOf(rs) !== -1) {
            what = what.replace(rs, args[i].toString());
        }
        i++;
    }
    return what;
}

export {
    translate,
    dictionary,
    toadd
};