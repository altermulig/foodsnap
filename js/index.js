var loadFile = function(event) {
    var reader = new FileReader();
    reader.onload = function(){
      var output = document.getElementById('output');
      output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
    $("#imageInfo").html("");
};

$("#output").click(function () {
    $("#fileToUpload").trigger('click');
});

function upload()
{
    var preview = document.querySelector('img'); //selects the query named img
    var file    = document.querySelector('input[type=file]').files[0]; //sames as here
    var reader  = new FileReader();
    var sImage = "";

    reader.onloadend = function () 
    {
        //preview.src = reader.result;
        const app = new Clarifai.App({apiKey: 'c420a1047f0f49dab1686251b5d3b3fd'});
        sImage = reader.result;
        sImage = sImage.substring(23);
        
        //console.log(sImage);
        //console.log(sImage);
        app.models.predict(Clarifai.FOOD_MODEL, {base64: sImage}).then(
//        app.models.predict(Clarifai.Food, {base64: sImage}).then(

        function(response) {
            var aImageData = response.outputs[0].data.concepts;
            //console.log(response.outputs[0].data.concepts);
            var sHtml  = "Huk av for ingredienser/matrett";
                sHtml += "<table>";
            
            //console.log(aImageData.length);
            for (var i=0; i<aImageData.length; i++)
            {
                //console.log(aImageData[i].name);
                //imageInfo
                var sFoodname = aImageData[i].name;
                //console.log("1");
                var dProbibility = aImageData[i].value*100;
                var dProbibility = dProbibility.toFixed(2);
                //var dProbibilityRound = Math.round(dProbibility * 100) / 100;
                //dProbibility = dProbibility.substring(0,5);
                if (parseFloat(dProbibility) >= 80.00)
                {
                    sHtml += "<tr>";
                    sHtml += "<td>";
                        sHtml += sFoodname;
                    sHtml += "</td>";
                    sHtml += "<td>";
                        sHtml += " " + dProbibility +"%";
                    sHtml += "</td>";
                    sHtml += "<td>";    
                        sHtml += "<input type='checkbox' /><br />";
                    sHtml += "</td>";
                    sHtml += "</tr>";
                }
            }
            sHtml += "</table>";
            sHtml += "<button type='button'>Lagre</button>";
            
            $("#imageInfo").html(sHtml);
            //$("#imageInfo").html(sHtml);
            //console.log(sHtml);
            //document.getElementById("imageInfo").innerHtml = sHtml;
        },
        function(err) 
        {
                // there was an error
        });
        //var sImage = reader.result;
    }

    if (file) 
    {
        reader.readAsDataURL(file); //reads the data as a URL
    } 
    else 
    {
        //preview.src = "";
    }
}


