import React from "react";
import {
  TwitterTimelineEmbed,
  // TwitterShareButton,
  TwitterFollowButton,
  // TwitterHashtagButton,
  // TwitterMentionButton,
  // TwitterTweetEmbed,
  // TwitterMomentShare,
  // TwitterDMButton,
  // TwitterVideoEmbed,
  // TwitterOnAirButton
} from "react-twitter-embed";

export default function BasicInfo(props) {
  let { member } = props;
  console.log(member);
  let recentRole = member.roles[0];
  let partyColor = "text-gray-800";
  switch (member.current_party) {
    case "R":
      partyColor = "text-red-700";
      break;
    case "D":
      partyColor = "text-blue-700";
  }

  return (
    <div className="border rounded p-2 w-full bg-gray-100 text-gray-800 border-black">
      <h2 className="font-bold text-xl border-b-2 border-gray-500">
        {member.first_name} {member.last_name}
      </h2>
      <h2 className={`${partyColor} font-bold`}>
        {member.current_party} - {recentRole.short_title} {recentRole.state}
      </h2>
      <a className="font-bold text-blue-600" href={member.url}>{member.url}</a>
      <TwitterFollowButton screenName={member.twitter_account} />
      <div className="flex flex-row hidden md:block">
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName={props.member.twitter_account}
          options={{ height: 400, width:500 }}
          />
          
          </div>
    </div>
  );
}
