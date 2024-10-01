import React, { useState } from "react";
import "./StyleProgramList.css"; // اضافه کردن فایل CSS

const ProgramList = ({ cropSeason }) => {
  const autumnMonths = [
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
    "فروردین",
    "اردیبهشت",
    "خرداد",
  ];
  const summerMonths = ["تیر", "مرداد", "شهریور", "مهر", "آبان"];

  const months = cropSeason === "پاییزه" ? autumnMonths : summerMonths;

  const [monthState, setMonthState] = useState({});
  const [decadeState, setDecadeState] = useState({});
  const [radioState, setRadioState] = useState({});
  const [textAreaState, setTextAreaState] = useState({});
  const [fileState, setFileState] = useState({});

  const handleMonthToggle = (month) => {
    setMonthState((prev) => ({
      ...prev,
      [month]: !prev[month],
    }));
  };

  const handleDecadeToggle = (month, decade) => {
    setDecadeState((prev) => ({
      ...prev,
      [month]: {
        ...prev[month],
        [decade]: !prev[month]?.[decade],
      },
    }));
  };

  const handleRadioChange = (month, decade, field, value) => {
    setRadioState((prev) => ({
      ...prev,
      [month]: {
        ...prev[month],
        [decade]: {
          ...prev[month]?.[decade],
          [field]: value,
        },
      },
    }));
  };

  const handleTextAreaChange = (month, decade, field, value) => {
    setTextAreaState((prev) => ({
      ...prev,
      [month]: {
        ...prev[month],
        [decade]: {
          ...prev[month]?.[decade],
          [field]: value,
        },
      },
    }));
  };

  const handleFileChange = (month, decade, event) => {
    const file = event.target.files[0];
    setFileState((prev) => ({
      ...prev,
      [month]: {
        ...prev[month],
        [decade]: file,
      },
    }));
  };

  const isRejected = (month, decade, field) => {
    return radioState[month]?.[decade]?.[field] === "reject";
  };

  const isSendButtonEnabled = (month, decade, field) => {
    const isApproved = radioState[month]?.[decade]?.[field] === "approve";
    const isRejectedWithText =
      radioState[month]?.[decade]?.[field] === "reject" &&
      textAreaState[month]?.[decade]?.[field]?.trim().length > 0;

    return isApproved || isRejectedWithText;
  };

  const isFileUploaded = (month, decade) => {
    return !!fileState[month]?.[decade];
  };

  return (
    <table className="table mt-4">
      <thead>
      <tr>
          <th>ماه</th>
          <th className="border-left wide-column">دوره</th>
          <th className="border-left">برنامه ارائه شده</th>
          <th>تایید آب منطقه‌ای</th>
          <th className="border-left">توضیحات آب منطقه‌ای</th>
          <th>تایید آب نیرو</th>
          <th className="border-left">توضیحات آب نیرو</th>
          <th className="narrow-column">برنامه نهایی</th>
          <th>تایید نهایی</th>
        </tr>
      </thead>
      <tbody>
        {months.map((month, monthIndex) => (
          <React.Fragment key={month}>
            <tr>
              <td>
                <input
                  type="checkbox"
                  checked={monthState[month]}
                  onChange={() => handleMonthToggle(month)}
                />
                {month}
              </td>
              <td colSpan="8"></td>
            </tr>
            {monthState[month] &&
              ["دهه اول", "دهه دوم", "دهه سوم"].map((decade, decadeIndex) => {
                const rowIndex = decadeIndex * 3 + 2; // محاسبه ایندکس برای مضرب 4
                return (
                  <tr
                    key={decade}
                    className={`${
                      rowIndex % 4 === 0 ? "thick-border-bottom" : ""
                    }`}
                  >
                    <td></td>
                    <td className="border-left">{/* ستون دوم */}
                      <input
                        type="checkbox"
                        checked={decadeState[month]?.[decade] || false}
                        onChange={() => handleDecadeToggle(month, decade)}
                      />{" "}
                      {decade}
                    </td>
                    {decadeState[month]?.[decade] && (
                      <>
                        <td className="border-left">{/* ستون سوم */}
                          <button className="btn btn-primary">مشاهده</button>
                        </td>
                        <td>
                          <input
                            type="radio"
                            name={`approval_${month}_${decade}`}
                            onChange={() =>
                              handleRadioChange(
                                month,
                                decade,
                                "regional",
                                "approve"
                              )
                            }
                          />{" "}
                          تایید
                          <input
                            type="radio"
                            name={`approval_${month}_${decade}`}
                            onChange={() =>
                              handleRadioChange(
                                month,
                                decade,
                                "regional",
                                "reject"
                              )
                            }
                          />{" "}
                          رد
                          <button
                            className="btn btn-secondary"
                            disabled={
                              !isSendButtonEnabled(month, decade, "regional")
                            }
                          >
                            ارسال
                          </button>
                        </td>
                        <td className="border-left">{/* ستون پنجم */}
                          <textarea
                            rows="3"
                            style={{ width: "100%" }}
                            title={
                              isRejected(month, decade, "regional")
                                ? "در صورت رد برنامه توضیح ارائه شود"
                                : ""
                            }
                            onChange={(e) =>
                              handleTextAreaChange(
                                month,
                                decade,
                                "regional",
                                e.target.value
                              )
                            }
                          ></textarea>
                        </td>
                        <td>
                          <input
                            type="radio"
                            name={`abniroo_${month}_${decade}`}
                            onChange={() =>
                              handleRadioChange(
                                month,
                                decade,
                                "abniroo",
                                "approve"
                              )
                            }
                          />{" "}
                          تایید
                          <input
                            type="radio"
                            name={`abniroo_${month}_${decade}`}
                            onChange={() =>
                              handleRadioChange(
                                month,
                                decade,
                                "abniroo",
                                "reject"
                              )
                            }
                          />{" "}
                          رد
                          <button
                            className="btn btn-secondary"
                            disabled={
                              !isSendButtonEnabled(month, decade, "abniroo")
                            }
                          >
                            ارسال
                          </button>
                        </td>
                        <td className="border-left">{/* ستون هفتم */}
                          <textarea
                            rows="3"
                            style={{ width: "100%" }}
                            title={
                              isRejected(month, decade, "abniroo")
                                ? "در صورت رد برنامه توضیح ارائه شود"
                                : ""
                            }
                            onChange={(e) =>
                              handleTextAreaChange(
                                month,
                                decade,
                                "abniroo",
                                e.target.value
                              )
                            }
                          ></textarea>
                        </td>
                        <td>
                          <input
                            type="file"
                            accept="application/pdf,image/*"
                            onChange={(e) =>
                              handleFileChange(month, decade, e)
                            }
                          />
                          <button
                            className="btn btn-secondary"
                            disabled={!isFileUploaded(month, decade)}
                          >
                            ارسال
                          </button>
                        </td>
                        <td>
                          <input
                            type="radio"
                            name={`finalApproval_${month}_${decade}`}
                            onChange={() =>
                              handleRadioChange(
                                month,
                                decade,
                                "final",
                                "approve"
                              )
                            }
                          />{" "}
                          تایید
                          <input
                            type="radio"
                            name={`finalApproval_${month}_${decade}`}
                            onChange={() =>
                              handleRadioChange(
                                month,
                                decade,
                                "final",
                                "reject"
                              )
                            }
                          />{" "}
                          رد
                          <div className="d-flex flex-row">
                            <button className="btn btn-success mx-1">
                              مشاهده
                            </button>
                            <button
                              className="btn btn-secondary"
                              disabled={
                                radioState[month]?.[decade]?.["final"] !==
                                  "approve" &&
                                radioState[month]?.[decade]?.["final"] !==
                                  "reject"
                              }
                            >
                              ارسال
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default ProgramList;
