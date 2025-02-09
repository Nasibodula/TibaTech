import React, { useEffect } from 'react';
import axios from 'axios';
import $ from 'jquery';

const SymptomsCheck = () => {
  useEffect(() => {
    // Initialize message handling once component mounts
    $("#messageArea").on("submit", function(event) {
      const date = new Date();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const str_time = hour+":"+minute;
      var rawText = $("#text").val();

      var userHtml = '<div class="d-flex justify-content-end mb-4"><div class="msg_cotainer_send">' + rawText + 
        '<span class="msg_time_send">'+ str_time + '</span></div><div class="img_cont_msg">' +
        '<img src="https://i.ibb.co/d5b84Xw/Untitled-design.png" class="rounded-circle user_img_msg"></div></div>';
      
      $("#text").val("");
      $("#messageFormeight").append(userHtml);

      axios.post('http://localhost:8080/get', {
        msg: rawText,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        var botHtml = '<div class="d-flex justify-content-start mb-4"><div class="img_cont_msg">' +
          '<img src="https://www.prdistribution.com/spirit/uploads/pressreleases/2019/newsreleases/d83341deb75c4c4f6b113f27b1e42cd8-chatbot-florence-already-helps-thousands-of-patients-to-remember-their-medication.png" class="rounded-circle user_img_msg">' +
          '</div><div class="msg_cotainer">' + response.data + '<span class="msg_time">' + str_time + '</span></div></div>';
        $("#messageFormeight").append($.parseHTML(botHtml));
      })
      .catch(error => console.error('Error:', error));
      
      event.preventDefault();
    });
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center h-100">		
        <div className="col-md-8 col-xl-6 chat">
          <div className="card">
            <div className="card-header msg_head">
              <div className="d-flex bd-highlight">
                <div className="img_cont">
                  <img src="https://www.prdistribution.com/spirit/uploads/pressreleases/2019/newsreleases/d83341deb75c4c4f6b113f27b1e42cd8-chatbot-florence-already-helps-thousands-of-patients-to-remember-their-medication.png" 
                       className="rounded-circle user_img" alt="Medical bot avatar" />
                  <span className="online_icon"></span>
                </div>
                <div className="user_info">
                  <span>Medical Chatbot</span>
                  <p>Ask me anything!</p>
                </div>
              </div>
            </div>
            <div id="messageFormeight" className="card-body msg_card_body">
            </div>
            <div className="card-footer">
              <form id="messageArea" className="input-group">
                <input type="text" id="text" name="msg" placeholder="Type your message..." 
                       autoComplete="off" className="form-control type_msg" required/>
                <div className="input-group-append">
                  <button type="submit" id="send" className="input-group-text send_btn">
                    <i className="fas fa-location-arrow"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomsCheck;