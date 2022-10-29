import { faMarsDouble } from '@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react';
import Chart from 'react-apexcharts'

function DonutChart({labels,series,width,fontSize,colors}){
   
   return(
      <React.Fragment>
         <div className='container-fluid mt-3 mb-3'>
            <Chart
            type="pie"
            width={width}
            height={300}
            series={series}
            
            options={{
               colors: colors,
               responsive: [{
                  breakpoint: [1840,1500,1200],
                  
              }],
               legend:{
                  fontSize: `${fontSize}px`
               },
               labels:labels
            }}
            
            
            >
            </Chart>
         </div>
      </React.Fragment>
   )
}
export default DonutChart