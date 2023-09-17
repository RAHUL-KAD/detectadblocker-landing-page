import { supabase } from "../lib/supabase";
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface AdblockStatsProps {
    uniqueUserId: string; // Define a prop for the unique_user_id
  }
  
  function AdblockStats({ uniqueUserId }: AdblockStatsProps) {
    const [data, setData] = useState<any[]>([]);
  
    useEffect(() => {
      async function fetchData() {
        try {
          // Replace 'your_table_name' with your actual table name
          const { data, error } = await supabase
            .from('your_table_name')
            .select('adblock')
            .eq('unique_user_id', uniqueUserId); // Use the prop for unique_user_id
  
          if (error) {
            console.error('Error fetching data:', error);
            return;
          }
  
          setData(data || []);
        } catch (error) {
          console.error('Error:', error);
        }
      }
  
      fetchData();
    }, [uniqueUserId]); // Make sure to include uniqueUserId in the dependency array
  
    // Count true and false values
    const trueCount = data.filter((item) => item.adblock === true).length;
    const falseCount = data.filter((item) => item.adblock === false).length;
  
    return (
      <div className="AdblockStats">
        <h1>Adblock Statistics for User ID: {uniqueUserId}</h1>
        <BarChart width={400} height={300} data={[{ name: 'True', count: trueCount }, { name: 'False', count: falseCount }]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </div>
    );
  }
  
  export default AdblockStats;