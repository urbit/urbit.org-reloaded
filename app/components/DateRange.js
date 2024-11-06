import React from "react";
import classnames from "classnames";
import { DateTime } from "luxon";

export const DateRange = ({ className, starts, ends, divider }) => {

  function generateDisplayDate(iso8601) {
    var zone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "UTC";
    var locale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "en-US";
    return DateTime.fromISO(iso8601, {
      zone: zone,
      locale: locale
    });
  }
  function formatDate(dateTimeObject) {
    return dateTimeObject.toLocaleString(DateTime.DATE_FULL);
  }
  function formatTime(dateTimeObject) {
    var dt = dateTimeObject.toLocaleString(DateTime.TIME_SIMPLE);
    return dt.replace(/:00/g, "");
  }
  

  // const formatTime = (date) => date.toFormat("t");
  // const formatDate = (date) => date.toFormat("cccc, LLLL d");
  // const formatTimeZone = (date) => date.toFormat("ZZZZZ");
  return (
    <div>
      {formatTime(generateDisplayDate(starts))}
      {formatDate(generateDisplayDate(starts))}
—
      {formatTime(generateDisplayDate(ends))}
      {formatDate(generateDisplayDate(ends))}
      {/* {formatDate(generateDisplayDate(ends))} */}
      {/* {formatDate(starts)} */}
    </div>
  );
  // For events which have no end datetime
  // if (!ends.isValid) {
  //   return (
  //     <div className={className}>
  //       <p>{formatDate(starts)}</p>
  //       {divider}
  //       <p>{`${formatTime(starts)} ${formatTimeZone(starts)}`}</p>
  //     </div>
  //   );
  // }
  // // For events which start and end on the same day
  if (starts.hasSame(ends, "day")) {
    return (
      <div className={classnames("whitespace-nowrap", className)}>
        <p>{formatDate(starts)}</p>
        {divider}
        <p>{`${formatTime(starts)} to ${formatTime(ends)} ${formatTimeZone(
          starts
        )}`}</p>
      </div>
    );
  }
  // // For multi-day events
  // return (
  //   <div className={className}>
  //     <p>
  //       {starts.hasSame(ends, "month")
  //         ? `${starts.toFormat("LLLL d")} to ${ends.toFormat("d, yyyy")}`
  //         : `${starts.toFormat("LLLL d")} to ${ends.toFormat("LLLL d, yyyy")}`}
  //     </p>
  //     <br />
  //   </div>
  // );
};
