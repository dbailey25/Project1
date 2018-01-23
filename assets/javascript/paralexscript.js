
$(document).ready(function() {
$('#background').mouseParallax({ moveFactor: 5 });
$('#foreground').mouseParallax({ moveFactor: 10 });
$('#fore-foreground').mouseParallax({ moveFactor: 15 });
$('#fore-fore-foreground').mouseParallax({ moveFactor: 20 });

$('body').height(3000);
});
