var app = new Vue({
    el: '#app',
    data: {
        citysearch: [],
        city: "",
        datatime: {},
        //        apikey:"44b1da538e4201498ff970f02e16c2d3",
        url_times: " http://api.openweathermap.org/data/2.5/weather?q=London&APPID=44b1da538e4201498ff970f02e16c2d3",
        //                           api.openweathermap.org/data/2.5/forecast?q={city name}, para cada 3 dias
        url_part1: " http://api.openweathermap.org/data/2.5/weather?q=",
        url_part2: "&APPID=44b1da538e4201498ff970f02e16c2d3",
        full_url: "",
        cities: ['madrid', 'london', 'barcelona', 'paris', 'berlin'],
        nombre: "",
        temp: 0,
        temp_max: 0,
        temp_min: 0,
        humidity: 0,
        presseure: 0,
        visibility: 0,
        value: false,
        
    },
    created: function () {
        this.valuedata();
        //        this.getData()
    },
    methods: {
        valuedata: function () {
            this.city = document.formulario.select.value;
            console.log(this.city)
            if (this.city != "null") {
                this.full_url = this.url_part1 + this.city + this.url_part2;
                this.getData();

            } else if (this.city == "null") {
                this.full_url = this.url_times;
            }

            console.log(this.full_url)
        },

        getData: function () {
            fetch(this.full_url, {

                method: "GET",

            }).then(function (response) {

                if (response.ok) {
                    // add a new promise to the chain
                    return response.json();
                }
                // signal a server error to the chain
                throw new Error(response.statusText);
            }).then(function (json) {
                // equals to .success in JQuery Ajax call
                this.datatime = json;
                app.value=true;

                app.nombre = this.datatime.name;
                app.temp = this.datatime.main.temp - 273;
                app.temp = Math.round(app.temp);
                app.temp_max = this.datatime.main.temp_max - 273;
                app.temp_max = Math.round(app.temp_max);
                app.temp_min = this.datatime.main.temp_min - 273;
                app.temp_min = Math.round(app.temp_min);
                app.humidity = this.datatime.main.humidity;
                app.presseure = this.datatime.main.pressure;
                app.visibility = this.datatime.visibility;


                console.log(this.datatime)


            }).catch(function (error) {
                // called when an error occurs anywhere in the chain
                console.log("Request failed: " + error.message);
            });


        },


    }
})
