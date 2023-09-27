import Posts from "../models/postModel.js";
import Users from "../models/userModel.js";

export const createPost = async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    const { description, image } = req.body;

    if (!description) {
      next("Description is required!");
      return;
    }
    const post = await Posts.create({
      description,
      image,
      userId,
    });
    res.status(200).json({
      success: true,
      message: "Post created successfully",
      data: post,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    const { search } = req.body;

    const user = await Users.findById(userId);
    const friends = user.friends.toString().split(",") ?? [];
    friends.push(userId);

    const searchPostQuery = {
      $or: [
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    };

    const posts = await Posts.find(search ? searchPostQuery : {})
      .populate({
        path: "userId",
        select: "firstName lastName location profileUrl -password",
      })
      .sort({ _id: -1 });

    const friendsPost = posts.filter((p) =>
      friends.includes(p?.userId?._id.toString())
    );
    const otherPost = posts.filter(
      (p) => !friends.includes(p?.userId?._id.toString())
    );

    let postResult = null;

    if (friendsPost.length) {
      postResult = search ? friends : [...friendsPost, ...otherPost];
    } else {
      postResult = posts;
    }

    res.status(200).json({
      success: true,
      message: "successfully",
      data: postResult,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Posts.findById(id).populate({
      path: "userId",
      select: "firstName lastName location profileUrl -password",
    });
    //   .populate({
    //     path: "comments",
    //     populate: {
    //       path: "userId",
    //       select: "firstName lastName location profileUrl -password",
    //     },
    //     options: {
    //       sort: {
    //         _id: -1,
    //       },
    //     },
    //   })
    //   .populate({
    //     path: "comments",
    //     populate: {
    //       path: "replies.userId",
    //       select: "firstName lastName location profileUrl -password",
    //     },
    //   });

    res.status(200).json({
      success: true,
      message: "successfully",
      data: post,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
