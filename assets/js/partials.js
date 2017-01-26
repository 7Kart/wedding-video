window['template']={"inputFile":"<li id=\"file\" class=\"portfolioVariant\">\n    <span>Файл</span>\n    <input id=\"fileLoad\" type=\"file\" name=\"files\" v-on:change=\"loadFile(event)\"/>\n    <div class=\"previewFileList\">\n        <img class=\"prev-photo-img\" :src=\"fileUrl\" />\n    </div>\n</li>","inputLink":"<li id=\"linkFile\" class=\"portfolioVariant\">\n    <span>Ссылка на файл</span><input type=\"text\"  name=\"linkFile\"/>\n</li>\n","inputVideo":"<li id=\"file\" class=\"portfolioVariant\">\n    <span>Файл видео</span><input id=\"fileLoad\" type=\"file\" name=\"files\"/>\n    <div class=\"previewFileList\"></div>\n</li>","linkVideo":"<li id=\"linkFile\" class=\"portfolioVariant\">\n    <span>Ссылка на видео</span><input type=\"text\"  name=\"linkFile\"/>\n</li>\n","modalWindow":"<div>\n    <transition name=\"fade\">\n        <div v-show=\"visible\" v-on:click=\"modalEmitWindHide()\" id=\"background-mask\"></div>\n    </transition>\n    <transition name=\"modal\">\n        <div class=\"modal-form\" v-show=\"visible\" >\n            <h2 class=\"modal-header\"> Добавить запись </h2>\n            <div class=\"modal-body\">\n                <form>\n                    <ul class=\"modal-inputs\">\n                        <li>\n                            <span>Наименование</span><input type=\"text\" name=\"name\" v-model=\"modalData.name\"/>\n                        </li>\n                        <li>\n                            <span>Комментарий</span><input type=\"text\" name=\"note\" v-model=\"modalData.note\"/>\n                        </li>\n                        <li>\n                            <span>Номер страницы</span>\n                            <select name=\"slideNumber\" v-model=\"modalData.slideNumber\">\n                                <option value=\"1\">1</option>\n                                <option value=\"2\">2</option>\n                                <option value=\"3\">3</option>\n                                <option value=\"4\">4</option>\n                            </select>\n                        </li>\n                        <li>\n                            <span>Что добавить</span>\n                            <select id=\"docType\" v-on:change=\"changeFiletype(event)\">\n                                <option value=\"filePhoto\">Файл фото</option>\n                                <option value=\"linkPhoto\">Ссылка на фото</option>\n                                <option value=\"fileVideo\">Видео файл</option>\n                                <option value=\"linkVideo\">Ссылка на видео</option>\n                            </select>\n                        </li>\n                        <li>\n                            <component v-on:fileLoad=\"showFile\" v-bind:is=\"inputType\"></component>\n                        </li>\n                    </ul>\n                    <ul class=\"modal-button\">\n                        <li>\n                            <input v-on:click=\"serialiseForm(modalData.fileData)\" type=\"button\" value=\"Добавить\"/>\n                        </li>\n                        <li>\n                            <input v-on:click=\"modalEmitWindHide()\" id=\"cancelModal\" type=\"button\"  value=\"Отмена\"/>\n                        </li>\n                    </ul>\n                </form>\n            </div>\n        </div>\n    </transition>\n</div>"}