window.onload = function () {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var image = new Image();
    image.src = './image/so-nya.png';

    image.onload = function () {
        ctx.fillRect(0, 0, 800, 600);

        var imageWidth  = image.width,
            imageHeight = image.height;

        var ltx =  10 + 400,
            lty =  20 + 300,
            lbx =  30 + 400,
            lby = 100 + 300,
            rbx = 120 + 400,
            rby = 150 + 300,
            rtx = 100 + 400,
            rty =  70 + 300;

        var scaleX = (rbx-ltx) / imageWidth,
            scaleY = (rby-lty) / imageHeight;

        var skewingX = (rty - lty) / (rtx - ltx),
            skewingY = (lbx - ltx) / (lby - lty);

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.transform(1, 0, 0, 1, ltx, lty);
        ctx.transform(1, skewingX, skewingY, 1, 0, 0);
        ctx.transform(scaleX, 0, 0, scaleY, 0, 0);
        ctx.drawImage(image, 0, 0);
    };
};
