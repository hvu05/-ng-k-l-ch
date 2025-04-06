import React, { useState, useEffect } from "react";
import { ref, get, set } from "firebase/database";
import { database } from '../firebase';
import Swal from 'sweetalert2';
import './Theme.css'; // Đảm bảo bạn đã tạo file CSS này
const timeSlots = [
  "8g - 8g30", "8g30 - 9g", "9g - 9g30", "9g30 - 10g",
  "10g15 - 10g45", "10g45 - 11g15", "11g15 - 11g45",
  "14g - 14g30", "14g30 - 15g", "15g -15g30",
  "15g30 - 16g", "15g45 - 16g15", "16g15 - 16g45", "16g45 - 17g15"
];

const days = ["monday", "tuesday", "thursday", "friday", "saturday"];

function Theme() {
  const [counts, setCounts] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Hiển thị loading alert
  useEffect(() => {
    if (isLoading) {
      let timerInterval;
      
      Swal.fire({
        title: "Đang tải dữ liệu",
        html: "Vui lòng chờ trong <b></b> giây...",
        timer: 2000,
        timerProgressBar: true,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("b");
          timerInterval = setInterval(() => {
            timer.textContent = (Swal.getTimerLeft() / 1000).toFixed(1);
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        }
      });

      return () => clearInterval(timerInterval);
    }
  }, [isLoading]);

  // Fetch dữ liệu từ Firebase
  useEffect(() => {
    const fetchData = async () => {
      const initial = {};
      
      try {
        for (let day of days) {
          for (let i = 0; i < timeSlots.length; i++) {
            const key = `${day}-${i}`;
            const slotRef = ref(database, `user/${key}`);
            const snapshot = await get(slotRef);
            initial[key] = snapshot.exists() ? snapshot.val() : 0;
          }
        }
        
        setCounts(initial);
        setIsLoading(false);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        Swal.fire("Lỗi", "Không thể tải dữ liệu từ server", "error");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateCount = async (key, delta) => {
    try {
      const dayRef = ref(database, `user/${key}`);
      const snapshot = await get(dayRef);
      const currentValue = snapshot.exists() ? snapshot.val() : 0;
      const newValue = Math.max(0, currentValue + delta);
      
      await set(dayRef, newValue);
      setCounts(prev => ({ ...prev, [key]: newValue }));
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
      Swal.fire("Lỗi", "Cập nhật không thành công", "error");
    }
  };

  if (isLoading) {
    return <div className="loading-screen">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="theme-container">
      {days.map(day => (
        <div key={day} className="day-block">
          <h3>{day.toUpperCase()}</h3>
          <table>
            <thead>
              <tr>
                <th>Giờ</th>
                <th>Số thành viên rảnh</th>
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((slot, i) => {
                const key = `${day}-${i}`;
                return (
                  <tr key={key}>
                    <td>{slot}</td>
                    <td className="count-controls">
                      <button 
                        onClick={() => updateCount(key, -1)}
                        disabled={counts[key] <= 0}
                      >
                        -
                      </button>
                      <span className="temp">{counts[key]}</span>
                      <button onClick={() => updateCount(key, 1)}>+</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default Theme;