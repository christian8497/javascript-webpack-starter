const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");    //91
const CopyPlugin = require("copy-webpack-plugin"); //93

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); //94
const TerserPlugin = require("terser-webpack-plugin");  //94

module.exports = {  //94. cambio de modo production
    mode: 'production',    //al especificar este modo se puede configurar para desarrollo, lo cual especificamos si el codigo sera libre de comentarios o en caso de produccion que tiene otras reglas de compilacion
    
    output: {
        clean: true, //88. limpia los archivos que para que no se repitan
        filename: 'main.[fullhash].js'  //94. tambien puede ser [contenthash] en lugar de [fullhash]
    },

    module: {
        rules: [
            {
                test: /\.html$/i,    //expresion regular para buscar y aplicar las reglas para archivos html, i es para que sea insensible
                loader: 'html-loader',
                options:{
                    //attributes: false,
                    //minimize:true,    //en la parte de produccion podemos especificarle minimizar el codigo y limpiarlo de codigo
                    sources: false,
                },
            },
            {
                test: /\.css$/i,
                exclude: /styles.css$/,     //91
                use: ['style-loader','css-loader']      //configuracion para que se admitan estilos css
            },
            {
                test: /styles.css$/,     //91
                use: [MiniCssExtractPlugin.loader,'css-loader']      //configuracion para que se admitan estilos css
            },
            {
                test: /\.(png|jpe?g|gif)$/, //92
                loader: 'file-loader'
            },
            {                               //95. configuracion de babel
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            }
        ]
    },

    optimization: {     //94. se agrega esto en el modo produccion
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ]
    },

    plugins: [
        new HtmlWebPackPlugin({
            title: 'Mi webpack App', //88. se cambia el titulo
            template: './src/index.html',   //  que archivo tomar
            filename: './index.html'    //a donde quiero colocarlo dentro del dist y como se va a llamar
        }),

        new MiniCssExtractPlugin({  //91
            filename:'[name].[fullhash].css',
            ignoreOrder:false
        }),

        new CopyPlugin({        //93
            patterns: [
              { from: "src/assets/", to: "assets/" },
            ],
          }),
    ]
}