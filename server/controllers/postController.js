import Posts from "../models/postModel.js";
import Users from "../models/userModel.js";
import Comments from "../models/commentModel.js";

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

export const getUserPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Posts.find(id)
      .populate({
        path: "userId",
        select: "firstName lastName location profileUrl -password",
      })
      .sort({ _id: -1 });

    res.status(200).json({
      success: true,
      message: "successfully",
      data: post,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getComments = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const postComments = await Comments.find({
      postId,
    })
      .populate({
        path: "userId",
        select: "firstName lastName location profileUrl -password",
      })
      .populate({
        path: "replies.userId",
        select: "firstName lastName location profileUrl -password",
      })
      .sort({ _id: -1 });

    res.status(200).json({
      success: true,
      message: "successfully",
      data: postComments,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const likePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body.user;

    const post = await Posts.findById(id);
    const isExist = post.likes.some((pid) => pid === String(userId));

    if (isExist)
      post.likes = post.likes.filter((pid) => pid !== String(userId));
    else post.likes.push(userId);

    const newPost = await Posts.findByIdAndUpdate(id, post, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "successfully",
      data: newPost,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const likePostComment = async (req, res, next) => {
  const { userId } = req.body.user;
  const { id, rid } = req.params;
  try {
    if (["false", undefined, null].includes(rid)) {
      const comment = await Comments.findById(id);
      const isExist = comment.likes.some((i) => i === String(userId));

      if (isExist)
        comment.likes = comment.likes.filter((i) => i !== String(userId));
      else comment.likes.push(userId);

      const updated = await Comments.findByIdAndUpdate(id, comment, {
        new: true,
      });
      res.status(201).json(updated);
    } else {
      const replyComments = await Comments.findOne(
        { _id: id },
        {
          replies: {
            $elemMatch: {
              _id: rid,
            },
          },
        }
      );
      const isExist = replyComments?.replies[0]?.likes?.some(
        (i) => i === String(userId)
      );

      if (isExist)
        replyComments.replies[0].likes = replyComments.replies[0].likes.filter(
          (pid) => pid !== String(userId)
        );
      else replyComments.replies[0].likes.push(userId);
      const query = { _id: id, "replied._id": rid };
      const updated = {
        $set: {
          "replies.$.likes": replyComments.replies[0].likes,
        },
      };
      const result = await Comments.updateOne(query, updated, { new: true });
      res.status(201).json(result);
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const commentPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body.user;
    const { comment, from } = req.body;

    if (comment === null) {
      return res.status(404).json({
        message: "Comment is required",
      });
    }

    const newComment = new Comments({
      comment,
      from,
      userId,
      postId: id,
    });

    await newComment.save();

    const post = await Posts.findById(id);

    post.comments.push(newComment._id);

    const updatedPost = await Posts.findByIdAndUpdate(id, post, {
      new: true,
    });

    res.status(201).json(newComment);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const replyPostComment = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.body.user;
  const { comment, replyAt, from } = req.body;
  if (comment === null) {
    return res.status(404).json({
      message: "Comment is required",
    });
  }

  try {
    const commentInfo = await Comments.findById(id);
    commentInfo.replies.push({
      comment,
      replyAt,
      from,
      userId,
      created_at: Date.now(),
    });

    commentInfo.save();

    res.status(200).json(commentInfo);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deletePost = async (req, res, next) => {
  const { id } = req.params;

  try {
    await Posts.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      meessage: "Deleted successfully",
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
