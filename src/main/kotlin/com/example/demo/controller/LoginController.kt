package com.example.demo.controller

import com.example.demo.DAO.UserDAO
import com.example.demo.entity.User
import lombok.Getter
import lombok.Setter
import org.springframework.context.annotation.Bean
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping
class LoginController(private val userRepository: UserDAO) {

    @PostMapping("/login")
    fun login(): String =
        "Login success"

    @GetMapping("/users")
    fun getUsers(): List<User> =
        userRepository.findAll()


    @Bean
    fun createUsers(){
        val anUser = User(name = "usuario",password = "contraseña");

        userRepository.save(anUser)
    }

    /*

    @GetMapping("/posts")
    fun getAllPosts(): List<Post> =
        postRepository.findAll()


    @PostMapping("/posts")
    fun createNewPost(@Valid @RequestBody post: Post): Post =
        postRepository.save(post)


    @GetMapping("/posts/{id}")
    fun getPostById(@PathVariable(value = "id") postId: Long): ResponseEntity<Post> {
        return postRepository.findById(postId).map { post ->
            ResponseEntity.ok(post)
        }.orElse(ResponseEntity.notFound().build())
    }

    @PutMapping("/posts/{id}")
    fun updatePostById(@PathVariable(value = "id") postId: Long,
                       @Valid @RequestBody newPost: Post): ResponseEntity<Post> {

        return postRepository.findById(postId).map { existingPost ->
            val updatedPost: Post = existingPost
                .copy(title = newPost.title, content = newPost.content)

            ResponseEntity.ok().body(postRepository.save(updatedPost))
        }.orElse(ResponseEntity.notFound().build())

    }

    @DeleteMapping("/posts/{id}")
    fun deletePostById(@PathVariable(value = "id") postId: Long): ResponseEntity<Void> {

        return postRepository.findById(postId).map { post  ->
            postRepository.delete(post)
            ResponseEntity<Void>(HttpStatus.OK)
        }.orElse(ResponseEntity.notFound().build())

    }*/
}
