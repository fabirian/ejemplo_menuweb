var menu = {
    comidas: [
        { nombre: "Pizza", ingredientes: "Masa, salsa de tomate, mozzarella, pepperoni", imagen: "Img/pizza.jpeg" },
        { nombre: "Hamburguesa", ingredientes: "Pan, carne, lechuga, tomate, cebolla, salsa especial", imagen: "Img/hamburguesa.jpeg" },
        { nombre: "Salchipapas", ingredientes: "Salchichas, papas fritas, salsa de queso, jalapeños", imagen: "Img/salchipapas.jpeg" },
        { nombre: "Ensalada César", ingredientes: "Lechuga romana, pollo, queso parmesano, crutones, aderezo César", imagen: "Img/Ensalada_César.jpg" }
    ],
    bebidas: [
        { nombre: "Coca-Cola", ingredientes: "Agua carbonatada, jarabe de maíz, colorante, cafeína", imagen: "Img/coca cola.jpeg" },
        { nombre: "Jugo de Naranja", ingredientes: "Naranjas frescas, agua, azúcar", imagen: "Img/jugo de naranja.png" },
        { nombre: "Cerveza", ingredientes: "Cebada, lúpulo, levadura, agua", imagen: "Img/cerveza.jpeg" },
        { nombre: "Agua Mineral", ingredientes: "Agua carbonatada natural", imagen: "Img/agua mineral.jpeg" }
    ]
};

$(document).ready(function () {
    $("#menu-tabs").tabs({
        beforeActivate: function (event, ui) {
            var activeTab = ui.newPanel.attr('id');
            if (activeTab === 'comidas') {
                mostrarElementos("comidas", $("#listaComidas"));
            } else if (activeTab === 'bebidas') {
                mostrarElementos("bebidas", $("#listaBebidas"));
            }
        }
    });

    // Function to populate and show menu items
    function mostrarElementos(categoria, contenedor) {
        contenedor.empty();
        menu[categoria].forEach(function (elemento) {
            var item = $("<div>", { class: "item" });
            var imagen = $("<img>", { src: elemento.imagen, alt: elemento.nombre });
            var nombre = $("<p>").text(elemento.nombre);
            var ingredientes = $("<p>", { class: "ingredientes" }).text("Ingredientes: " + elemento.ingredientes);
            var volver = $("<a>", { class: "volver", href: "#" }).text("Volver al menú");

            ingredientes.hide();
            volver.hide();

            item.append(imagen, nombre, ingredientes, volver).appendTo(contenedor);

            item.click(function () {
                if (!item.hasClass("seleccionado")) {
                    $(".item").removeClass("seleccionado").css({ zIndex: 0 });
                    item.addClass("seleccionado").css({ zIndex: 1 });
                    contenedor.css({ position: "relative" });
                    contenedor.children(".item").not(".seleccionado").fadeOut();
                    item.animate({ width: "100%", height: "100%", top: 0, left: 0 }, 500);
                    item.find('.ingredientes').fadeIn();
                    item.find('.volver').fadeIn();
                } else {
                    item.removeClass("seleccionado").animate({ width: "150px", height: "150px" }, 500);
                    contenedor.css({ position: "static" });
                    contenedor.children(".item").fadeIn();
                    item.find('.ingredientes').fadeOut();
                    item.find('.volver').fadeOut();
                }
            });

            volver.click(function (e) {
                e.stopPropagation();
                item.removeClass("seleccionado").animate({ width: "150px", height: "150px" }, 500);
                contenedor.css({ position: "static" });
                contenedor.children(".item").fadeIn();
                item.find('.ingredientes').fadeOut();
                item.find('.volver').fadeOut();
            });
        });
    }

    // Show the default category
    mostrarElementos("comidas", $("#listaComidas"));

    // Show the tabs with fade effect
    $(".menu-content").show("fade", 500);
});
