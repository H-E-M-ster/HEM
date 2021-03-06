import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { MemberCredentialsDto } from './dto/member-credential.dto';
import { MemberSignInDto } from './dto/member-signIn.dto';
import { MemberUpdateDto } from './dto/member-update.dto'
import { MemberService } from './member.service';
import { Member } from './member.entity';
import { GetMember } from './get-member.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('member')
export class MemberController {
    constructor(
        private memberService : MemberService
    ){}

    @Post('/signup')
    signUp(@Body(ValidationPipe) memberCredentialsDto : MemberCredentialsDto):Promise<void> {
        return this.memberService.signUp(memberCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) memberSignInDto : MemberSignInDto): Promise<{accessToken: string}>  {
        return this.memberService.signIn(memberSignInDto);
    }

    @Get('/list')
    getAllMember(): Promise<Member[]> {
        return this.memberService.getAllMember();
    }

    @Delete('/delete')
    @UseGuards(AuthGuard()) 
    deleteMember(@GetMember() member:Member): Promise<void> {
        return this.memberService.deleteMember(member);
    }

    @Get('/myinfo')
    @UseGuards(AuthGuard()) 
    getMemberByNo(@GetMember() member:Member):Promise<Member> {
        //console.log(member);
        return this.memberService.getMemberByNo(member);
    }

    @Patch('/update')
    @UseGuards(AuthGuard()) 
    updateMember(
        @Body(ValidationPipe) memberUpdateDto : MemberUpdateDto,
        @GetMember() member:Member): Promise<Member> {
            return this.memberService.updateMember(memberUpdateDto,member);
        }

    // @Post('/test')
    // @UseGuards(AuthGuard()) 
    // test(@GetMember() member:Member) {
    //     console.log(member);
    // } 
}
